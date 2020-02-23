import UserController from './controller/UserConroller'
export default function setRoutes(app) {

    //User
    const userCtrl = new UserController();

    app.route('/api/user').post(userCtrl.addUser);
    app.route('/api/getAllUser').get(userCtrl.getAllUser);
    app.route('/api/getUserById/:id').get(userCtrl.getUserById); 
    app.route('/api/deleteUserById').delete(userCtrl.deleteUserById);
    //End User

}