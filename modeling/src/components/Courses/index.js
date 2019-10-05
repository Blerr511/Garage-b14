import React, { useState } from "react";
import ReactPageScroller from "react-page-scroller";
import Courses from "./Courses";
import { graduatesInfo } from "../nav/Routes";

const Page = () => {
  let ref;
  const [state, setState] = useState({ page: 0 });
  return (
    <div>
      <div className="verticalScroll">
        <ul>
          {graduatesInfo.map((el, id) => (
            <li
              key={id}
              onClick={_ => {
                ref.goToPage(id);
                setState({ page: id });
              }}
              className="scroller"
            >
              <span className={state.page === id ? "active" : ""}>
                <span>
                  <span></span>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ReactPageScroller
        ref={_ => (ref = _)}
        pageOnChange={_ => setState({ page: _ - 1 })}
      >
        {graduatesInfo.map(el => (
          <Courses
            key={el.id}
            h2={el.h2}
            text={el.text}
            img={el.img}
            id={el.id}
            bg={el.bg}
          />
        ))}
      </ReactPageScroller>
    </div>
  );
};

export default Page;
