import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  template: `
    <a class="card card-size" [routerLink]="routerLink">
      <img [src]="imageUrl" class="card-image" alt="Card image">
      <div class="card-label">{{ label }}</div>
    </a>
  `,
  styles: [`
    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
    }

    @media (min-width: 768px) {
      .card-size {
        width: 30rem;
        height: 16rem;
        margin: 2rem;
      }
      .card-label {
        font-size: 2.2rem;
      }
    }

    @media (max-width: 768px) {
      .card-size {
        height: 8rem;
        margin: 8px auto;
      }
      .card-label {
        font-size: 2rem;
      }
    }

    .card {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
      overflow: clip;
      background: #000;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
        transform: scale(1.02);
        transition: transform .8s ease-in-out;
      }
    }

    .card-image {
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
      filter: brightness(0.5);
      animation: fadeIn 1.5s ease-in-out;
    }

    .card-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      font-family: 'Poppins', sans-serif;
    }
  `]
})
export class DashboardCardComponent {
  @Input() imageUrl: string = '';
  @Input() label: string = '';
  @Input() routerLink: string[] = [];
}
