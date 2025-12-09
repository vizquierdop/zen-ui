import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-table-tag',
  imports: [CommonModule],
  templateUrl: './ui-table-tag.html',
  styleUrl: './ui-table-tag.scss',
})
export class UITableTag {
  @Input() text: string = '';
  @Input() color: string = '#333';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fixedWidth: string = '100px';

  get styles() {
    return {
      'background-color': this.adjustColor(this.color, +120), // fondo mucho más claro
      color: this.adjustColor(this.color, -20), // texto fuerte
      border: `1px solid ${this.adjustColor(this.color, -40)}`, // borde oscuro
      width: this.fixedWidth,
      'text-align': 'center',
    };
  }

  private adjustColor(col: string, amount: number): string {
    let usePound = false;
    let color = col;

    if (color[0] == '#') {
      color = color.slice(1);
      usePound = true;
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;

    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);

    return (usePound ? '#' : '') + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
