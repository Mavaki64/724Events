import { Fragment, useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.slice().sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  useEffect(() => {
    if (!byDateDesc?.length) return undefined;
  
    const id = setInterval(() => {
      setIndex((prev) => (prev < byDateDesc.length - 1 ? prev + 1 : 0));
    }, 5000);
  
    return () => clearInterval(id);
  }, [byDateDesc?.length]);

  if (!byDateDesc?.length) return null;

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <Fragment key={`${event.title}-${event.date}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={`${e.title}-${e.date}`}
                  type="radio"
                  name="radio-button"
                  readOnly
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Slider;
