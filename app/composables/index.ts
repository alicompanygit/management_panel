import { reactive } from 'vue';


interface IContact  {

}

export class test  implements IContact {

}

export const useTest = reactive(new test());
