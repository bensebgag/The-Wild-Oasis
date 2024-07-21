import "./Setting.scss";
import Fields from "../../UI/form/Fields";
import Form from "../../UI/form/Form";
function Setting() {
  return (
    <div className="SettingContainer">
      <div className="setting">
        <h1>Update hotel settings</h1>
        <Form>
          <Fields>
            <div className="field">
              <label>Minimum nights/booking</label>
              <input type="number" />
            </div>
            <div className="field">
              <label>Maximum nights/booking</label>
              <input type="number" />
            </div>
            <div className="field">
              <label>Maximum guests/booking</label>
              <input type="number" />
            </div>
            <div className="field">
              <label>Breakfast price</label>
              <input type="number" />
            </div>
          </Fields>
        </Form>
      </div>
    </div>
  );
}

export default Setting;
