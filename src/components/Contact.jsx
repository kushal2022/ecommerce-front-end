import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
    return(
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-full px-4 py-1 mb-4">
                        <span className="text-white text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">Contact Us</h1>
                    <p className="text-slate-600 text-lg">
                        We would love to hear from you! Please fill out the form below or contact us directly
                    </p>
                </div>

                <div className="bg-white shadow-2xl rounded-2xl p-8 border-2 border-orange-100 mb-8">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-800 mb-2">
                                Full Name
                            </label>
                            <input 
                                type="text"
                                required
                                placeholder="Enter your name"
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-800 mb-2">
                                Email Address
                            </label>
                            <input 
                                type="email"
                                required
                                placeholder="your.email@example.com"
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-800 mb-2">
                                Message
                            </label>
                            <textarea 
                                rows="5"
                                required
                                placeholder="Tell us what you think..."
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"/>
                        </div>

                        <button className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold text-lg">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text">Contact Information</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-6 text-center">
                            <FaPhone className="text-3xl mx-auto mb-3"/>
                            <h3 className="font-semibold mb-2">Phone</h3>
                            <span className="text-sm">+1 641-819-1563</span>
                        </div>

                        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg p-6 text-center">
                            <FaEnvelope className="text-3xl mx-auto mb-3"/>
                            <h3 className="font-semibold mb-2">Email</h3>
                            <span className="text-sm">kushaldhakal25@gmail.com</span>
                        </div>

                        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-6 text-center">
                            <FaMapMarkedAlt className="text-3xl mx-auto mb-3"/>
                            <h3 className="font-semibold mb-2">Location</h3>
                            <span className="text-sm">8515 Tejon ST, Federal Heights CO</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;