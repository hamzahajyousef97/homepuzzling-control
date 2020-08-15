import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  get_product(collection, id){
    return this.db.collection(collection).doc(id).snapshotChanges();
  }

  get_products(collection){
    return this.db.collection(collection).snapshotChanges();
  }

  addProduct(collection, value){
    return this.db.collection(collection).add({
      nameTR: value.nameTR,
      nameAR: value.nameAR,
      descriptionTR: value.descriptionTR,
      descriptionAR: value.descriptionAR,
      image: value.image
    });
  }

  updateProduct(collection, name, value){
    return this.db.collection(collection).doc(name).set(value);
  }

  deleteProuct(collection, name){
    return this.db.collection(collection).doc(name).delete();
  }

  DeleteFeedback(message){
    return this.db.collection('feedbacks').doc(message).delete();
  }

  addImage(collection, id, value){
    return this.db.collection(collection + '/' + id + '/images').add({
      image: value
    });
  }

  getImage(collection, id){
    return this.db.collection(collection + '/' + id + '/images').snapshotChanges();
  }

  deleteImage(collection, id, image_id){
    return this.db.doc(collection + '/' + id + '/images/' + image_id).delete();
  }

  add_quiz(value){
    return this.db.collection('quizes').doc(value.link).set({
      link: value.link,
      nameAR: value.nameAR,
      descriptionAR: value.descriptionAR,
      time: value.time
    });
  }

  update_quiz(name, value){
    return this.db.collection('quizes').doc(name).set(value);
  }

  get_quiz(id){
    return this.db.collection('quizes').doc(id).snapshotChanges();
  }

  get_quizes(){
    return this.db.collection('quizes').snapshotChanges();
  }

  delete_quiz(name){
    return this.db.collection('quizes').doc(name).delete();
  }

  add_question(quiz, questionNumber, value){
    return this.db.collection('quizes').doc(quiz).collection('questions').doc(questionNumber).set({
      question: value.question,
    });
  }

  get_questions(link){
    return this.db.collection('quizes' + '/' + link + '/questions').snapshotChanges();
  }

  get_question(quiz, questionId){
    return this.db.doc('quizes/' + quiz + '/questions/' + questionId).snapshotChanges();
  }

  get_options(quiz, questionId){
    return this.db.collection('quizes/' + quiz + '/questions/' + questionId + '/options').snapshotChanges();
  }

  delete_question(quiz, questionId){
    return this.db.doc('quizes/' + quiz + '/questions/' + questionId).delete();
  }

  delete_option(quiz, questionId, optionId){
    return this.db.doc('quizes/' + quiz + '/questions/' + questionId + '/options/' + optionId).delete();
  }

  add_option(quiz, questionNumber, value){
    return this.db.collection('quizes').doc(quiz).collection('questions').doc(questionNumber).collection('options').add({
      option: value.option,
      isAnswer: value.isAnswer
    });
  }

}
