import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AboutUsPage.css"; // Ensure this file has all your CSS

const AboutUsPage = () => {
    useEffect(() => {
        const navbar = document.querySelector(".navbar");
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add("shrink");
            } else {
                navbar.classList.remove("shrink");
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    } else {
                        entry.target.classList.remove("in-view");
                    }
                });
            },
            { threshold: 0.2 }
        );

        const footerSections = document.querySelectorAll(".footer-container > div");
        footerSections.forEach((section) => observer.observe(section));

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <Link to="/"><img width="170" src="/assets/images/logo.png" alt="Logo" /></Link>
                    </div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="#">Gallery</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                        <li><Link to="/join-us">Join Us</Link></li>
                    </ul>
                </nav>
            </header>

            <section className="about-section" id="about" style={{ marginTop: "65px" }}>
                <h1>About Us</h1>
                <p>
                    <span class="highlight">Shri Shyam Sunder Gaushala</span> is run by the <strong>Bhoorishringa Foundation</strong>, a non-profit organization solely engaged in the divine service of <strong>Gau Mata</strong> and her progeny.
                </p>
                <p>
                    It was observed that due to <strong>Anna Pratha</strong> (leaving cows abandoned) in Bundelkhand, farmers started using razor wires to protect their crops. Hungry cows attempting to enter the fields often got severely injured by these wires. With no medical support from either farmers or the government, these cows suffered painful deaths.
                </p>
                <p>
                    Volunteers from Bhoorishringa Foundation conducted research in Bundelkhand and initiated treatment efforts in <strong>village Terha, district Hamirpur</strong>. Recovered cows were sheltered at Shri Shyam Sunder Gaushala in <strong>village Kandhauli</strong>.
                </p>
                <p>
                    Today, treatment is also conducted on-site at the Gaushala. Currently, <strong>226 cows</strong> reside peacefully in Kandhauli, which is just <strong>9 km</strong> from Hamirpur in Bundelkhand.
                </p>
                <p>
                    With over <strong>500 Gauvansh</strong> now, our goal is to create a holistic Gaushala that represents a complete ecosystem of cows and their progeny. The cow is intricately linked to the four <strong>Purusharthas</strong>: Dharma, Artha, Kama, and Moksha.
                </p>
                <p>
                    Unlike most Gaushalas that operate with a limited vision, we focus on practical, impactful action. Many places talk theory, but lack real-world implementation. Others create publicity through impractical products.
                </p>
                <p>
                    This website showcases our <strong>vision</strong> and the <strong>actions</strong> we are taking. Explore the site to see how we are addressing the root causes. We invite your support—any contribution matters. Together, we can ensure complete protection for <strong>Mother Cow and her progeny</strong>.
                </p>
            </section>

            <footer className="site-footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <img src="/assets/images/logo.png" alt="Logo" className="footer-logo" />
                        <p className="footer-quote">"O Uddhava, I can be worshiped within the cows..." (SB.11.11.43)</p>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/people/Shyamsundergaushala/100067849740840/"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-pinterest-p"></i></a>
                            <a href="https://www.instagram.com/shyamsundergaushala/"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="#">Causes</Link></li>
                            <li><Link to="/donate">Donate Now</Link></li>
                            <li><Link to="/join-us">Join Us</Link></li>
                            <li><Link to="/about-us">About Us</Link></li>
                            <li><Link to="#">Gallery</Link></li>
                            <li><Link to="/contact-us">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><i className="fas fa-map-marker-alt"></i> SHF-1, 6/166, Sector-2, Rajender Nagar, Ghaziabad, Pin-201005</li>
                            <li><i className="fas fa-phone-alt"></i> +91-9650129944</li>
                            <li><i className="fas fa-envelope"></i> <a href="mailto:bhoorishringa@gmail.com">bhoorishringa@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-dark-golden">
                    <div className="footer-content">
                        <p>Copyright © 2017.
                            All rights reserved by <a href="https://shyamsundergoshala.com" target="_blank" rel="noreferrer">shyamsundergoshala.com</a>
                        </p>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/causes">Causes</Link>
                            <Link to="/events">Events</Link>
                            <Link to="/about-us">About</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/contact-us">Contact</Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default AboutUsPage;
