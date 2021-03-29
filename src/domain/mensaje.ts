export class Mensaje {

    id: number;
    msg: string;
    user_id: number;
    room: string;
    createdAt: Date;
    user: string;

    static fromJson(individuoJSON): Mensaje {
        return Object.assign(new Mensaje(), individuoJSON, {
          user: 'user-' + individuoJSON.user_id
        });
    }

    // tslint:disable-next-line: variable-name
    constructor(_id?: number, _msg?: string, _user_id?: number, _room?: string, _createdAt?: Date) {
      this.msg = _msg;
      this.user_id = _user_id;
      this.room = _room;
      this.createdAt = _createdAt;
    }

}