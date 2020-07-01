import React from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';

const PRIVACY_POLICY = `
<h1 style="text-align: justify;"><span style="color: #ffffff;">I. Privacy Policy</span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">HKUST SIGHT built the Foresee app as a Freemium app. This SERVICE is provided by HKUST SIGHT at no cost and is intended for use as is.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Foresee unless otherwise defined in this Privacy Policy.</span></h1>
<p style="text-align: justify;">&nbsp;</p>
<h1 style="text-align: justify;">&nbsp;</h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>II. Log Data</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (&ldquo;IP&rdquo;) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</span></h1>
<p style="text-align: justify;">&nbsp;</p>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>III. Cookies</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">This Service does not use these &ldquo;cookies&rdquo; explicitly. However, the app may use third party code and libraries that use &ldquo;cookies&rdquo; to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</span></h1>
<p style="text-align: justify;">&nbsp;</p>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>IV. Service Providers</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">We may employ third-party companies and individuals due to the following reasons:</span></h1>
<ul style="text-align: justify;">
<li>
<h1><span style="color: #ffffff;">To facilitate our Service;</span></h1>
</li>
<li>
<h1><span style="color: #ffffff;">To provide the Service on our behalf;</span></h1>
</li>
<li>
<h1><span style="color: #ffffff;">To perform Service-related services; or</span></h1>
</li>
<li>
<h1><span style="color: #ffffff;">To assist us in analyzing how our Service is used.</span></h1>
</li>
</ul>
<h1 style="text-align: justify;"><span style="color: #ffffff;">We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</span></h1>
<p style="text-align: justify;">&nbsp;</p>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>V. Security</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</span></h1>
<p style="text-align: justify;">&nbsp;</p>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>VI. Links to Other Sites</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</span></h1>
<p style="text-align: justify;">&nbsp;</p>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>VII. Children&rsquo;s Privacy</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</span></h1>
<p>&nbsp;</p>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>VIII. Changes to This Privacy Policy</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">This policy is effective as of 2020-07-01</span></h1>
<p style="text-align: justify;">&nbsp;</p>
<h1 style="text-align: justify;"><span style="color: #ffffff;"><strong>IX. Contact Us</strong></span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at foresee@ust.hk.</span></h1>
`;

export default function PrivacyPolicy() {
  return (
    <LinearGradientBackground style={{ height: '100%' }} colors={['#2c3e50', '#2980b9']} start={[1, 1]} end={[0, 0]} locations={[0.2, 0.7]}>
      <WebView style={{ backgroundColor: 'transparent', marginTop: 100, padding: 100 }} originWhitelist={['*']} source={{ html: PRIVACY_POLICY }} />
      <Text style={{ marginTop: 20, color: 'white', alignSelf: 'center', marginBottom: 20 }}>© 2020 ForeSee</Text>
    </LinearGradientBackground>
  );
}
