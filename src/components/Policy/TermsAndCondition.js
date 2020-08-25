import React from "react";
import { Text } from "react-native";
import { WebView } from "react-native-webview";
import { LinearGradientBackground } from "../Utils/LinearGradientBackground";

const TERMS_AND_CONDITION = `
<h1 style="text-align: justify;"><span style="color: #ffffff;">I. Terms &amp; Conditions</span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">By downloading or using the app, these terms will automatically apply to you &ndash; you should make sure therefore that you read them carefully before using the app. You&rsquo;re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You&rsquo;re not allowed to attempt to extract the source code of the app, and you also shouldn&rsquo;t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to HKUST SIGHT.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">HKUST SIGHT is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you&rsquo;re paying for.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">The Foresee app stores and processes personal data that you have provided to us, in order to provide our Service. It&rsquo;s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone&rsquo;s security features and it could mean that the Foresee app won&rsquo;t work properly or at all.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">You should be aware that there are certain things that HKUST SIGHT will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but HKUST SIGHT cannot take responsibility for the app not working at full functionality if you don&rsquo;t have access to Wi-Fi, and you don&rsquo;t have any of your data allowance left.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">&nbsp;</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">If you&rsquo;re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you&rsquo;re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you&rsquo;re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">Along the same lines, HKUST SIGHT cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged &ndash; if it runs out of battery and you can&rsquo;t turn it on to avail the Service, HKUST SIGHT cannot accept responsibility.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">With respect to HKUST SIGHT&rsquo;s responsibility for your use of the app, when you&rsquo;re using the app, it&rsquo;s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. HKUST SIGHT accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">At some point, we may wish to update the app. The app is currently available on Android &amp; iOS &ndash; the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you&rsquo;ll need to download the updates if you want to keep using the app. HKUST SIGHT does not promise that it will always update the app so that it is relevant to you and/or works with the Android &amp; iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.</span></h1>
<p style="text-align: justify;"><span style="color: #ffffff;">&nbsp;</span></p>
<h1 style="text-align: justify;"><span style="color: #ffffff;">II. Changes to This Terms and Conditions</span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page.</span></h1>
<h1 style="text-align: justify;"><span style="color: #ffffff;">These terms and conditions are effective as of 2020-07-01</span></h1>
<p style="text-align: justify;"><span style="color: #ffffff;">&nbsp;</span></p>
<h1 style="text-align: justify;"><span style="color: #ffffff;">III. Contact Us</span></h1>
<hr />
<h1 style="text-align: justify;"><span style="color: #ffffff;">If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at sight.foresee@gmail.com</span></h1>`;

export default function TermsAndCondition() {
    return (
        <LinearGradientBackground
            style={{ height: "100%" }}
            colors={["#2c3e50", "#2980b9"]}
            start={[1, 1]}
            end={[0, 0]}
            locations={[0.2, 0.7]}
        >
            <WebView
                style={{
                    backgroundColor: "transparent",
                    marginTop: 100,
                    padding: 100,
                }}
                originWhitelist={["*"]}
                source={{ html: TERMS_AND_CONDITION }}
            />
        </LinearGradientBackground>
    );
}
