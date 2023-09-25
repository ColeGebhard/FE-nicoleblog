import React, { useState } from "react";
import { subscribeEmail } from './api';
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import './Footer.css';

const Footer = (props) => {

    const SubscribeForm = () => {
        const [email, setEmail] = useState("");

        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const subEmail = await subscribeEmail({ email });

                if (subEmail.error) {
                    NotificationManager.error("Failed to Subscribe", 'Email already used')
                    window.alert('Subscribe fail');
                } else {
                    setEmail("")
                    NotificationManager.success('Thanks for subscribing', 'Succesfully Joined!');
                    // window.alert('Subscribe success');
                }
            } catch (e) {
                console.error('Failed to subscribe', e);
            }
        };

        return (
            <form className='emailForm' id="emailFormFooter"onSubmit={handleSubmit}>
                <fieldset className='emailFormField'>
                    <p className='description'>Join us to get updates on new readings</p>
                    <span className='textSpan'>
                        <input
                            aria-label="Email address"
                            name="email_address"
                            placeholder="Email address"
                            required
                            type="email"
                            className='emailInput'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <button type="submit" className='subscribeButton'>Join</button>
                    </span>
                </fieldset>
            </form>
        );
    };

    return (
        <footer>
            <div className="mainContent">
                <div className="activeParent">
                    <h1>Stay Active!</h1>
                    <SubscribeForm />
                </div>
                <div className="donationParent">
                    <span className="donationText">
                        <h2>Take Action</h2>
                        <p>At Auburn Activist, I like to use <br/>my outreach as a source
                            to <br/>spread organizations I am fond <br/>of. Click the link to help assist<br/>
                            the World Wildlife Fund <br/>and their mission.
                        </p>
                    </span>
                    <span className="quickLinks">
                        <a target="_blank" rel="noreferrer" href={"https://protect.worldwildlife.org/page/52717/donate/1?en_og_source=Web_Donation&ea.tracking.id=Web_Topnav&supporter.appealCode=AWE2402OQ18299A01179RX&_gl=1*1y1vsue*_ga*MTU2MjYzOTM4MS4xNjkzMzQ5NzUy*_ga_FK6M9RK84Z*MTY5MzM0OTc1Mi4xLjAuMTY5MzM0OTc1NC41OC4wLjA.&_ga=2.196949676.1832874294.1693349752-1562639381.1693349752"}>
                            <button className="charityDonation">Donate Now</button>
                        </a>
                    </span>
                </div>
                <img src="../images/Auburn.png" className="footerImg" alt="logo" />
                {/* <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/nicole-bondurant/">
                        <img className="logoLinks" alt="linked in" src="../images/LI-In-Bug.png" />
                    </a> */}
            </div>
            <div className="devBio">
                <h4>Site made and maintained by Nicholas Cole Gebhard </h4>
                <span className="devLinksParent">
                    <a target="_blank" rel="noreferrer" href={"https://github.com/ColeGebhard"}>
                        <img className="devLinks" alt="gitHub" src="../images/github-mark.png" />
                    </a>
                    <a target="_blank" rel="noreferrer" href={"https://github.com/ColeGebhard"}>
                        <img id="personalPage" className="devLinks" alt="personalPage" src="../images/1174949_js_react js_logo_react_react native_icon.png" />
                    </a>
                    <a target="_blank" rel="noreferrer" href={"https://github.com/ColeGebhard"}>
                        <img className="devLinks" alt="linkedIn" src="../images/LI-In-Bug.png" />
                    </a>
                    <a target="_blank" rel="noreferrer" href={"https://linktr.ee/gebhardcole"}>
                        <img className="devLinks" alt="beerMe" src="../images/Daco_4674844.png" />
                    </a>
                </span>
            </div>
        </footer>

    )

}

export default Footer;