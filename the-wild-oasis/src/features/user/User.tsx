import "./User.scss";
import Fields from "../../UI/form/Fields";
import Form from "../../UI/form/Form";
function User() {
  return (
    <div className="userContainer">
      <div className="user">
        <h1>Create a new user</h1>
        <Form>
          <Fields>
            <div className="field">
              <label>Full name</label>
              <input type="text" />
            </div>
            <div className="field">
              <label>Email address</label>
              <input type="text" />
            </div>
            <div className="field">
              <label>Password (min 8 characters)</label>
              <input type="text" />
            </div>
            <div className="field">
              <label>Repeat password</label>
              <input type="text" />
            </div>
          </Fields>
          <div className="buttons">
            <button className="cancel">cancel</button>
            <button>create new user</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default User;
