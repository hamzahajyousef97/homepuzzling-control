import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Product } from '../shared/product';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  item: any;
  id: any;
  product: Product;
  productForm: FormGroup;

  formErrors = {
    'nameTR': '',
    'nameAR': '',
    'descriptionTR': '',
    'descriptionAR': ''
  };

  validationMessages = {
    'nameAR': {
      'required': 'nameAR is required.',
    },
    'nameTR': {
      'required': 'nameAR is required.',
    },
    'descriptionAR': {
      'required': 'descriptionAR is required.',
    },
    'descriptionTR': {
      'required': 'descriptionAR is required.',
    },
  };

  @ViewChild('fform') productFormDirective;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private firebaseService: FirebaseService,
    private titleService: Title) {
      this.titleService.setTitle("اليوسف | تعديل منتج ");
    }

  ngOnInit() {
      this.createForm();
      this.route.data.subscribe(routeData => {
        let data = routeData['data'];
        if (data) {
          this.item = data.payload.data();
          this.id = data.payload.id;
        }
      })
  }

  createForm() {
    this.productForm = this.fb.group({
      nameAR: ['', [Validators.required]],
      nameTR: ['', [Validators.required]],
      descriptionAR: ['', [Validators.required]],
      descriptionTR: ['', [Validators.required]],
    });

    this.productForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.productForm) {
      return;
    }
    const form = this.productForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous erroe message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    const formData = {
      ...this.productForm.value,
      image: this.item.image,
    };
    this.product = formData;
    this.firebaseService.updateProduct('product', this.id, this.product)
    .then(
      res => {
        this.openSnackBar("تم تعديل المنتج بنجاح", '🙂')
        setTimeout(() => { this.router.navigate(['/home']); }, 3000);
      }
    )

    this.productForm.reset({
      nameAR: '',
      nameTR: '',
      descriptionAR: '',
      descriptionTR: '',
    });
    this.productFormDirective.resetForm();
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }

}
