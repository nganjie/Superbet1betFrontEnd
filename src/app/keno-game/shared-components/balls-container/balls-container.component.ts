import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

export enum BallColor {
  RED = '#ff0000',
  YELLOW = '#eecc00',
  GREEN = '#00aa00',
  BLUE = '#0000ff'
}

/** Render */
interface ViewState {
  ballsContainer: HTMLDivElement;
  ballTemplate: HTMLDivElement;
  balls: HTMLDivElement[];
}

interface RenderConstance {
  fps: number;
}

/** Physic */
class Ball {
  /**
   * Unique constructor of this class
   * @param center - Center of the ball
   * @param radius - Radius of the circle
   * @param numLabel - Number of the ball
   * @param color - Color of the ball
   * @param [speed = {0, 0} ] - X component of speed
   */
  constructor(
    public center: Point,
    public radius: number,
    public numLabel: number,
    public color: BallColor,
    public speed: Vector = new Vector(0, 0)
  ) { }

  getMostClosestBallCenterInCircle(circleRadius: number, circleCenter: Point): Point {
    const r = 2 * this.radius;
    const R2 = circleRadius - this.radius;
    const diffCentersX = circleCenter.x - this.center.x;
    const diffCentersY = circleCenter.y - this.center.y;
    const a = 2 * diffCentersX;
    const b = 2 * diffCentersY;
    const c = Math.pow(diffCentersX, 2) + Math.pow(diffCentersY, 2) - Math.pow(R2, 2) + Math.pow(r, 2);
    const delta = Math.pow(2 * a * c, 2) - 4 * (Math.pow(a, 2) + Math.pow(b, 2)) *
    (Math.pow(c, 2) - Math.pow(b, 2) * Math.pow(r, 2));
    const x = (2 * a * c + Math.sqrt(delta)) / (2 * (Math.pow(a, 2) + Math.pow(b, 2)));
    const y = (c - a * x) / b;
    return new Point(x + this.center.x, y + this.center.y);
  }

  getMostClosestBallToTwoBalls(point2: Point): Point {
    const r = 2 * this.radius;
    const diffCentersX = point2.x - this.center.x;
    const diffCentersY = point2.y - this.center.y;
    const a = 2 * diffCentersX;
    const b = 2 * diffCentersY;
    const c = Math.pow(diffCentersX, 2) + Math.pow(diffCentersY, 2);
    const delta = Math.pow(2 * a * c, 2) - 4 * (Math.pow(a, 2) + Math.pow(b, 2)) *
    (Math.pow(c, 2) - Math.pow(b, 2) * Math.pow(r, 2));
    const x = (2 * a * c + Math.sqrt(delta)) / (2 * (Math.pow(a, 2) + Math.pow(b, 2)));
    const y = (c - a * x) / b;
    return new Point(x + this.center.x, y + this.center.y);
  }

}


class Point {

  /**
   * Unique constructor of the class
   * @param  x - X coordinate of the point
   * @param  y - Y coordinate of the point
   */
  constructor(
    public x: number,
    public y: number
  ) { }
}

class Vector {

  /**
   * Unique constructor of the class
   * @param  x - X coordinate of the vector
   * @param  y - Y coordinate of the vector
   */
  constructor(
    public x: number,
    public y: number
  ) { }

  scalarProduct(v: Vector): number {
    return v.x * this.x + v.y * this.y;
  }

  norm(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  multiply(alpha: number): Vector {
    this.x *= alpha;
    this.y *= alpha;
    return this;
  }

  add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }
}


interface PhysicsState {
  balls: Ball[];
}

interface GlobalConstance {
  // X coordinate of balls container center
  x_omega: number;
  // Y coordinate of balls container center
  y_omega: number;
  // Radius of balls container
  R: number;
  // Radius of a ball
  r: number;
  // Vertical up limit of ground
  ground: {
    y1: number,
    y2: number
  };
  g: number;
  px2m: number;
  stopped: boolean;
}


@Component({
  selector: 'app-balls-container',
  templateUrl: './balls-container.component.html',
  styleUrls: ['./balls-container.component.scss']
})
export class BallsContainerComponent implements OnInit, AfterViewInit {

  numsList: number[] = [];
  // Simulator
  @ViewChild('ballcontainer') ballsContainer!: ElementRef;
  // Template
  @ViewChild('ball') ball!: ElementRef;

  @Input() ballContainerRadius!: number;

  @Input() ballRadius!: number;

  @Input() hidderCircle!: boolean;

  @Input() delay = 1000;

  constructor() {
    for (let i = 1; i < 81; i++){
      this.numsList.push(i);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.run(80, 500, this.delay); // Start the animation after 2s
  }

  initPhysic(n: number): { globalConstants: GlobalConstance, physicsState: PhysicsState } {
    /** Process steps
     * 1. Create the box
     * 2. Create the balls with random position and random speed
     */

    /** Global constance declarations into a literal object globalConstants
     * ground : the thickness of the soil
     * g : Gravitational acceleration rate
     * px2m : Ratio of distances in pixels to distances in meters
     */
    const globalConstants: GlobalConstance = {
      x_omega: this.ballContainerRadius,
      y_omega: this.ballContainerRadius,
      R: this.ballContainerRadius,
      r: this.ballRadius * 1.5,
      ground: {
        y1: this.ballContainerRadius + this.ballContainerRadius * 0.6,
        y2: this.ballContainerRadius + this.ballContainerRadius * 0.8
      },
      g: 500 * 10, // TODO: m/s
      px2m: 0.01,
      stopped: false,
    };


    /** Global variables declaration into a literal object global_state
     * balls : List of all balls of the simulation
     * box : contain the dimensions of the container
     */
    const physicsState: PhysicsState = {
      balls: []
    };

    physicsState.balls = this.initPhysicsBalls(globalConstants, n);


    return {globalConstants, physicsState};
  }

  getBallColorByNum(num: number): BallColor {
    if (num < 21){
      return BallColor.GREEN;
    }
    else if (num > 20 && num < 41){
        return BallColor.BLUE;
    }
    else if (num > 40 && num < 61){
        return BallColor.RED;
    }
    else {
        return BallColor.YELLOW;
    }
  }

  getBallsList(
    containerCenter: Point,
    containerRadius: number,
    ballRadius: number,
    numsArr: number[],
    startInd: number,
    YgroundUp: number,
    maxNum: number,
    g: number
  ): Ball[] {
      const ballsList: Ball[] = [];
      const x = - Math.sqrt(Math.pow(containerRadius, 2)  - Math.pow(YgroundUp - containerCenter.y, 2)) + containerCenter.x;
      let ind = startInd;
      let point = new Point(x, YgroundUp);
      const R = containerRadius + ballRadius;

      while (ballsList.length < maxNum) {
        const color = this.getBallColorByNum(numsArr[ind]);
        const ball = new Ball(point, ballRadius, numsArr[ind], color);
        this.initSpeed(ball, containerRadius * 2, R, g, containerCenter.x);
        ballsList.push(ball);
        ind += 1;
        if (point.y < YgroundUp) {
          point = new Point((ballsList[0].center.x + ballsList[1].center.x) / 2, (ballsList[0].center.y + ballsList[1].center.y) / 2);
        }
        else {
          point = ball.getMostClosestBallCenterInCircle(R, containerCenter);
        }
      }
      return ballsList;

  }

  initPhysicsBalls(globalConstance: GlobalConstance, n: number): Ball[] {

    const arr = this.numsList;
    const {r, R, ground, x_omega, g, y_omega} = globalConstance;
    const R2 = R - r;
    const numsArr = this.getShuffledArray(arr);
    const centerContainer = new Point(x_omega, y_omega);
    const n2 =  Math.floor(n / 2);
    const ballsList: Ball[] = this.getBallsList(centerContainer, R2, r, numsArr, 0, ground.y1, n2, g);
    const ballsList2: Ball[] = this.getBallsList(centerContainer, R2 - r, r, numsArr, n2, ground.y1, n2, g);

    ballsList2.push(...ballsList);

    return ballsList2;

  }

  distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }


  update(dt: number, globalConstants: GlobalConstance, physicsState: PhysicsState): void {
    /** Process steps
     * 1. Update positions of the balls
     * 2. Detect collisions
     * 3. Update the speeds (all of the balls)
     */

    const { r, g, R, x_omega } = globalConstants;
    const WIDTH = 2 * R;
    const { y1, y2 } = globalConstants.ground;
    // console.log(physicsState.balls[0]);
    for (const ball of physicsState.balls) {
      // update position
      ball.center.x += ball.speed.x * dt;
      ball.center.y += ball.speed.y * dt;
      // update speed
      if (globalConstants.stopped && ball.center.y + r > y1) {
        ball.speed.y += 0;
      } else {
        ball.speed.y += g * dt;
      }
      ball.speed.x += 0;

      if (ball.center.y > y2){
        if (!globalConstants.stopped) {
          this.initSpeed(ball, WIDTH, R, g, x_omega);
        } else {
          ball.speed.x = 0;
          ball.speed.y = 0;
        }
      }
      // console.log(distance(
      //     globalConstants.x_omega,
      //     globalConstants.y_omega,
      //     ball.center.x, ball.center.y) + globalConstants.r);
      const n = new Vector(
        ball.center.x - globalConstants.x_omega,
        ball.center.y - globalConstants.y_omega
      );
      if (n.norm() <= 1) { // safety
        continue;
      }
      n.multiply(1 / n.norm());
      if (
        this.distance(
          globalConstants.x_omega,
          globalConstants.y_omega,
          ball.center.x, ball.center.y) + globalConstants.r > globalConstants.R &&
          n.scalarProduct(ball.speed) > 0
        ) {
        // Collision detected
        // log the current speed
        // alert("COLLISION");
        // A. Compute unit vector

        // alert("norme de n " + n.norm());
        const t = new Vector(-n.y, n.x);

        // alert("norme de t " + n.norm());
        // alert("n.t " + n.scalarProduct(t));
        // B. Compute projections of unit vector
        // const t = tab[ind];
        const vn = n.scalarProduct(ball.speed);
        const vt = t.scalarProduct(ball.speed);
        // C. Compute v'
        const Vafter = n.multiply(-vn).add(t.multiply(vt));
        // alert("norm_before = " + ball.speed.norm() + " norm_after = " + v_after.norm());
        ball.speed = Vafter;
      }
    }
    // console.log(physicsState.balls[0]);
  }

  initSpeed(ball: Ball, width: number, R: number, g: number, Xomega: number): void {
    const H_MAX = R  * 0.8;
    const W_MAX = width * 1;
    ball.speed.y = Math.random() * - Math.sqrt(2 * g * H_MAX);
    const t = Math.floor(Math.random() * R);
    if (Math.random() > 0.6){
      if (ball.center.x < t) {
        ball.speed.x = Math.min(Math.random() * (ball.center.x - W_MAX) * g / (2 * ball.speed.y), -0.4 * ball.speed.y);
      }
      else {
        ball.speed.x = Math.max(Math.random() * (ball.center.x) * g / (2 * ball.speed.y), 0.4 * ball.speed.y);
      }
    }
  }

  getShuffledArray(arr: any[]): any[] {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  generateRandNum(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }


  initView(n: number, physicsState: PhysicsState): ViewState {

    /** global variable declarations */
    const viewState: ViewState = {
      ballsContainer: this.ballsContainer.nativeElement as HTMLDivElement,
      ballTemplate: this.ball.nativeElement as HTMLDivElement,
      balls: []
    };

    const diameterContainer = (this.ballContainerRadius * 2);

    viewState.ballsContainer.style.width = diameterContainer + 'vh';
    viewState.ballsContainer.style.height = diameterContainer + 'vh';

    viewState.ballTemplate.style.width = (this.ballRadius * 2) + 'vh';
    viewState.ballTemplate.style.height = (this.ballRadius * 2) + 'vh';
    viewState.ballTemplate.style.borderWidth = (this.ballRadius / 2) + 'vh';

    viewState.ballTemplate.style.fontSize = (this.ballRadius - 0.5) + 'vh';

    const { ballsContainer, ballTemplate, balls } = viewState;
    for (let i = 0; i < n; i++) {
      const clone = ballTemplate.cloneNode() as HTMLDivElement;
      clone.style.opacity = '0.8';
      balls.push(clone);
      ballsContainer.appendChild(balls[i]);
    }

    // render the initial state of the view
    this.render(physicsState, viewState);

    return viewState;
  }

  render(physicsState: PhysicsState, viewState: ViewState): void {
    const phyBalls = physicsState.balls;
    const viewBalls = viewState.balls;
    const n = viewBalls.length;

    /*if (phyBalls.length !== viewBalls.length) {
      throw new Error('value Error');
    }*/

    for (let i = 0; i < n; i++) {
      viewBalls[i].style.top = phyBalls[i].center.y - phyBalls[i].radius + 'vh';
      viewBalls[i].style.left = phyBalls[i].center.x - phyBalls[i].radius + 'vh';
      viewBalls[i].style.borderColor = phyBalls[i].color;
      viewBalls[i].textContent = phyBalls[i].numLabel + '';
    }
  }

  run(n: number, framePerSecoond: number, delay: number = 0): void {
    const dt = 1 / framePerSecoond;
    // update the physic's world every dt
    let pid;
    const physic = this.initPhysic(n);
    // init the view
    const view = this.initView(n, physic.physicsState);

    setTimeout(() => {
      pid = setInterval(() => {
        this.update(dt, physic.globalConstants, physic.physicsState);
        this.render(physic.physicsState, view);
      }, dt * 5000);

    }, delay);
  }

}
