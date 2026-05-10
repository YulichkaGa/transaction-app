import './HeroIllustration.css';

import mobileImage from '../../../../assets/mobile.png';

function HeroIllustration({ t }) {
    return (
        <div className="hero-illustration">
            <span className="hero-badge">
                {t.badge}
            </span>

            <h1>
                {t.title}
            </h1>

            <div className="illustration-wrapper">
                <div className="illustration-text-side">
                    <div className="mock-text">
                        תשתית התשלומים
                        <br />
                        הבטוחה, היציבה
                        <br />
                        והמתקדמת בישראל
                    </div>
                </div>

                <div className="illustration-phone-side">
                    <div className="phone">
                        <img
                            src={mobileImage}
                            alt="Mobile"
                            className="phone-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroIllustration;