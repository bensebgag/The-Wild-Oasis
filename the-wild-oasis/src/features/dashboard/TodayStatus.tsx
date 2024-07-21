import "./TodayStatus.scss";
function TodayStatus() {
  return (
    <div className="today-status">
      <span className="today-status__title">Today</span>
      <ul className="today-status__list">
        <li className="today-status__item">
          <div className="today-status__item-header">
            <span className="today-status__item-status">ARRIVING</span>
            <span className="today-status__item-name">
              <span className="fleg">fleg</span> Jonathan Smith
            </span>
          </div>
          <div className="today-status__item-footer">
            <span className="today-status__item-duration">7 nights</span>
            <button className="today-status__item-button">CHECK IN</button>
          </div>
        </li>
        <li className="today-status__item">
          <div className="today-status__item-header">
            <span className="today-status__item-status">ARRIVING</span>
            <span className="today-status__item-name">
              <span className="fleg">fleg</span> Jonathan Smith
            </span>
          </div>
          <div className="today-status__item-footer">
            <span className="today-status__item-duration">7 nights</span>
            <button className="today-status__item-button">CHECK IN</button>
          </div>
        </li>
        <li className="today-status__item">
          <div className="today-status__item-header">
            <span className="today-status__item-status">ARRIVING</span>
            <span className="today-status__item-name">
              <span className="fleg">fleg</span> Jonathan Smith
            </span>
          </div>
          <div className="today-status__item-footer">
            <span className="today-status__item-duration">7 nights</span>
            <button className="today-status__item-button">CHECK IN</button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TodayStatus;
