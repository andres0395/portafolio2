import { Component } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-compresorimg',
  standalone: true,
  imports: [],
  templateUrl: './compresorimg.component.html',
  styleUrl: './compresorimg.component.css'
})
export default class CompresorimgComponent {
  compressedImage: any;

  constructor(private imageCompress: NgxImageCompressService) { }

  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: string = '';
  onFileSelected() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imgResultBeforeCompression = image;
      console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
      console.log(image);
      this.imageCompress
        .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
        .then(compressedImage => {
          this.imgResultAfterCompression = compressedImage;
          console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
      });
    });
  }


  downloadImage() {
    const link = document.createElement('a');
    link.href = this.imgResultAfterCompression;
    link.download = 'compressed-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.imgResultAfterCompression = '';
    this.imgResultBeforeCompression = '';
  }
}
