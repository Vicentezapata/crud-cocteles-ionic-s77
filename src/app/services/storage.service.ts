import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';

interface Usuario {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage:Storage) { 
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key:string){
    return await this._storage?.get(key)
  }

  async registerUser(email:string, password:string, firstName:string, lastName:string){
    const hashPass =  await bcrypt.hash(password, 10);
    const user:Usuario = {email, password:hashPass, firstName, lastName};
    const users = await this.get('usuarios') || [];
    users.push(user);
    await this.set('usuarios', users);
  }

  async loginUser(email:string,password:string){
    const users = await this.get('usuarios') || [];
    const user = users.find((u: Usuario) => u.email === email);

    if(user && await bcrypt.compare(password, user.password)){
      return user;
    }
    else{
      return false;
    }
  }
}
