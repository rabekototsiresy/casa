import app from 'firebase/app'
import auth from 'firebase/auth'
import firestore from 'firebase/firestore'


const config = {
  apiKey: "AIzaSyA9iYM7hZyvHTx_V77uh2VTxjcOf43gZ20",
  authDomain: "casa-mofo.firebaseapp.com",
  databaseURL: "https://casa-mofo.firebaseio.com",
  projectId: "casa-mofo",
  storageBucket: "casa-mofo.appspot.com",
  messagingSenderId: "408103190470",
  appId: "1:408103190470:web:b5061f5313af291c7afcc7"
}

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth()
    this.db = app.firestore()
  }

  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)
  
  signUpUser = (email,password)=>
    this.auth.createUserWithEmailAndPassword(email,password)

  signOutUser = ()=>
    this.auth.signOut()
  
  user = (uid,username,category) =>{
    return this.db.doc('users/'+uid).set({
      email: username,
      category: category,
      id: uid
    })
  }

getUser = ()=>{
  return this.db.collection('users')
}  

deleteUserDb = (id)=> this.db.doc(`users/${id}`).delete()



addFinalProduct = (productName,price,unite,category)=>
  this.db.collection('finalProduct').add({
    productName: productName,
    price: price,
    unite: unite,
    category: category
  })



  
addBaseMaterial = (matierePremiere,unite)=> this.db.collection('matierePremiere').add({
  matierePremiere: matierePremiere,
  unite: unite
})


addFournisseur = fournisseur =>
  this.db.collection('Fournisseur').add({
    fournisseur: fournisseur
  })

addUnity = unite =>
  this.db.collection('Unite').add({
    unite: unite
  })

  addClient = (client)=>
    this.db.collection('Clients').add(
    {
      client: client
    }
  )

  getClients = ()=>
     this.db.collection('Clients')

  
  deleteClient = (id) =>
    this.db.collection('Clients').doc(id).delete()
}


export default Firebase