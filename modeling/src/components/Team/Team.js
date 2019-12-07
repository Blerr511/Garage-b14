import React from 'react';

import { test } from '../../test';

import './Team.less';

const Team = () => {
  return (
    <div style={{ backgroundImage: `url(${test.team.bg})` }} className="team">
      <div>
        <section className="next">
          <div>{test.team.desc}</div>
          <h2>{test.team.title}</h2>
        </section>
        {test.team.members.map(el => (
          <section key={el.id}>
            <div>{el.desc}</div>
            <div>
              <img src={el.img} alt="team member" />
            </div>
          </section>
        ))}
        <div style={{ position: 'relative' }} className="next"></div>
      </div>
    </div>
  );
};

export default Team;
