import React from "react";
import Footer from '../components/Footer';

function Pricing() {
  
  return (
    <div className="h-full bg-[#F7F2FB]">
      <div>
        <p className="text-4xl text-[#7566BB] font-bold pt-32 text-center">
          DeepPurple pricing
        </p>
        <p className="text-xl text-[#414141] text-center mt-8">
          We have a pricing plan that’s perfect for you. Save money with DeepPurple’s transparent <br></br>and innovative approach to pricing.
        </p>
      </div>
      <div>
        <div className="mt-16 grid w-full gap-16 grid-cols-2 px-32">
          <div className="">
            <p className="text-3xl text-[#7566BB] font-bold mb-2">
              Unlock customer service analyzer
            </p>
            <p className="text-lg text-[#414141]">
              Activated account can immediately start using this service to
              review your employees’ performance and gain valuable
              insights from your customer service recordings.
            </p>
          </div>
          
          <div className="">
            <p className="text-3xl text-[#7566BB] font-bold mb-2">
              Only pay for what you use
            </p>
            <p className="text-lg text-[#414141]">
              DeepPurple is priced based on the total duration of audio
              successfully processed by the service each month. This
              means you have complete control over your expenses
              and won't encounter any hidden fees, upfront costs, or
              termination charges.
            </p>
          </div>
        </div>
        <div className="mt-16 grid w-full gap-16 grid-cols-2 px-32">
          <div className="">
            <p className="text-3xl text-[#7566BB] font-bold mb-2">
              Get in touch with us
            </p>
            <p className="text-lg text-[#414141]">
              If you have any questions regarding our plans or products,
              our dedicated team is ready to assist.{' '}
              <a href="/aboutUs" class="text-[#7566BB] hover:underline">
                Click here
              </a>
              {' '}to send us your inquiries, and we'll be happy to provide the answers you need.
            </p>
          </div>
          
          <div className="mb-32">
            <p className="text-3xl text-[#7566BB] font-bold mb-2">
              Pricing table
            </p>
            <div className="relative">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-[#7566BB] border-b border-t border-[#83848A]">
                  <tr>
                      <th scope="col" className="px-6 py-3 text-lg text-white font-medium">
                          Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-lg text-white font-medium">
                          Pricing
                      </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#83848A]">
                    <td className="px-6 py-2 text-[#414141]">
                        Customer service analyzer
                    </td>
                    <td className="px-6 py-2 text-[#414141]">
                        $0.024/minute
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Pricing;