import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Product } from '../shared/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;
  item: any;
  id: any;
  files: File[] = [];
  file: File;
  images: any[];
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public router: Router,
    public snackBar: MatSnackBar,
    private firebaseService: FirebaseService,
    private titleService: Title) { 
      this.titleService.setTitle("اليوسف | إضافة صور للمنتج ");
    }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.id = data.payload.id;
      }
    })

    this.firebaseService.getImage('product', this.id)
    .subscribe(images => {
      this.images = images;
    })
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.file = this.files[i];
      this.startUpload(this.file);
    }
  }

  startUpload(file) {
    const path = `test/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.firebaseService.addImage('product', this.id, this.downloadURL)
        this.openSnackBar("تم اضافة الصورة بنجاح", '🙂')
        setTimeout(() => {
          this.percentage = null;
          this.snapshot = null;
          this.downloadURL = null;
        }, 2000);

        this.files = [];
      }),
    );
  }

  deleteImage(image_id) {
    this.firebaseService.deleteImage('product', this.id, image_id)
    .then(
      res => {
        console.log("Image deleted succesfully")
      },
      err => {
        console.log(err);
      }
    )
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }

}
