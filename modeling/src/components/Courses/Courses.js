import React, { Component } from "react";
import "./Courses.css";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.name = "";
    this.email = "";
    this.tel = "";
    this.changeHundler = this.changeHundler.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }
  state = {
    showInfo: false,
    showMail: false,
    errorMail: false,
    errorName: false,
    errorTel: false
  };
  sendEmail() {
    this.setState({ errorMail: false, errorName: false, errorTel: false });
    let errCount = 0;
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi.test(
        this.mail
      )
    ) {
      this.setState({ errorMail: true });
      errCount++;
    }

    if (!(this.tel.length < 13 && this.tel.length > 7)) {
      this.setState({ errorTel: true });
      errCount++;
    }

    if (this.name.length < 3) {
      this.setState({ errorName: true });
      errCount++;
    }

    if (errCount > 0) return false;
    const templateParams = {
      name: this.name,
      tel: this.tel,
      email: this.email,
      course: this.props.h2,
      date: new Date()
    };

    window.emailjs.send("gmail", "template_EbFXGjNf", templateParams).then(
      function(response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function(error) {
        console.log("FAILED...", error);
      }
    );
  }
  changeHundler(key, e) {
    this[key] = e;
  }
  render() {
    return (
      <div
        style={{
          backgroundImage: this.props.bg,
          backgroundSize: "cover",
          backgroundPosition: "left"
        }}
        id={this.props.id}
        className="Courses"
      >
        <span className={this.state.showInfo ? "animateToSmothBg" : ""}>
          <section>
            {this.state.showInfo ? (
              <div className="infoSection show">
                <h2>{this.props.h2}</h2>
                <span>
                  {this.props.img.map(el => (
                    <img
                      style={{ marginLeft: "10px" }}
                      height="40"
                      key={el.alt}
                      src={el.src}
                      alt={el.alt}
                    />
                  ))}
                </span>
                <p>{this.props.text}</p>
              </div>
            ) : null}
          </section>

          <section>
            {this.state.showMail ? (
              <div className="mailform show">
                <span style={{ fontSize: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 900 }}>
                    Լրացրե՛ք հայտը
                  </span>
                  <br />
                  դասընթացին մասնակցելու համար
                </span>
                <input
                  type="text"
                  onChange={_ => this.changeHundler("name", _.target.value)}
                  placeholder="Անուն Ազգանուն"
                  className={this.state.errorName ? "error" : ""}
                />
                <input
                  className={this.state.errorTel ? "error" : ""}
                  type="tel"
                  onChange={_ => this.changeHundler("tel", _.target.value)}
                  placeholder="Հեռախոսահամար"
                />
                <input
                  className={this.state.errorMail ? "error" : ""}
                  type="email"
                  onChange={_ => this.changeHundler("mail", _.target.value)}
                  placeholder="E-mail"
                />
                <button onClick={this.sendEmail}>Ուղարկել</button>
              </div>
            ) : (
              <div className="shortInfo">
                <h2>{this.props.h2}</h2>
                <span>
                  {this.props.img.map(el => (
                    <img
                      style={{ marginLeft: "10px" }}
                      height="40"
                      key={el.alt}
                      src={el.src}
                      alt={el.alt}
                    />
                  ))}
                </span>
                <button
                  onClick={_ =>
                    this.setState({ showMail: true, showInfo: true })
                  }
                  className={this.state.showMail ? "big hidden" : "big"}
                >
                  ԳՐԱՆՑՎԵԼ ՀԻՄԱ
                </button>
                <button
                  className={this.state.showInfo ? "little hidden" : "little"}
                  onClick={_ => this.setState({ showInfo: true })}
                >
                  ՄԱՆՐԱՄԱՍՆ
                </button>
              </div>
            )}
          </section>
        </span>
      </div>
    );
  }
}

export default Courses;
