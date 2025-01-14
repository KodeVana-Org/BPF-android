/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const VissionScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        {/* <View style={styles.flagGradient}>
          <LinearGradient
            style={styles.gradient}
            colors={['#FF671F', '#fff', '#046A38']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        </View> */}
        <NavHeader title={'Vissions of BPF'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textContainer}>
            <Text style={styles.chapter}>गोदान नोजोर</Text>
            <Text style={styles.header}>Vision BTC, 2016</Text>
            <Text style={styles.body}>
              सिबिनां,
              {'\n'}गिबि गिबियावनो बि टि सिनि गासै नोगोरारि लोगोसे हारि, राव,
              दोहोरोम बासिलायनाय गैयै दुलाराय आसामनि राइजोफोरखौ BTC सरकारनि
              फारसेनिफ्राइ गोसो गोर्बोजों सिबिनाय बाउहरबाय। बारलांनाय सानफोराव
              नोंथांमोननि बेसेन गोसा मदद- थुलुंगा आरो गोसो उसिफावनाय बोर
              सारस्रिनायजों जों थामथि खेबनि थाखाय BTC सरकार दानो हाबावबाय।
              {'\n'}बेखायनो जों गोख्रों थांखि लादों-BTC एबा आसामनि गासै बिथिंनि
              • जौगानायनि थाखाय, गासै हारि हारिसानि समान मोनथाइ आरो समान
              जौगाखांनायनि थाखाय ।{'\n'}समान मोनथाइ होनायनि गेजेरजॉसो समान
              जौगाथाइआ फैगोन। समान मोनथाइ, समान जौगानायनि गेजेरजोंसो हारि, राव,
              दोहोरोम बासिलायनाय गैयै गासै थाखोनि राइजोफोरनि गोजोन, खौसेथि आरो
              जौगाखांनाया जाफुंसारगोन।
              {'\n'}बेखायनो जोंनि नोजोरा- गोजोन, खौसेथि आरो जौगानाय ।{'\n'}
              गोजोन, खौसेथि आरो जौगाखांनाय गायसननायनि गेजेरजोंनो BTC खौ जों आसाम
              एबा सा-सानजा हायुंल' नडा, दुलाराय हादरनि सिङावनो दखरसे आदर्श ओनसोल
              महरै गायसननो लुबैयो। बे बिथिंआव राइजोफोरनि हेफाजाब आरो मददनि
              गोनांथि जोबोरैनो दं। हेफाजाब आरो मदद होलायनायनि गेजेरजों BTC एबा
              आसामनि गासै हारि-हारिसा, राव, दोहोरोमारि सुबुंफोरनि गेजेराव जों
              गोरोबलायनायनि बिदिन्थि गायसनलांनो लुबैयो ।{'\n'}दिनै BTC नि गोथार
              जोनोम सानाव जों बै गेदेमा जोहोलाव-जोहोलावजो बिथांमोनखौ गोसोखांदों,
              जाय बिथांमोननि बाउसोमनाय आरो मावसोमनायनि सोलाव BTC आ जोनोम
              मोन्दों। जों दिनैबो बावनानै थाडाखै आसामनि गोबां
              राजखान्थि-राजखान्थि नङै आफाद-गौथुम, सानसुमै एबा माखासे मख'जाथाव
              गेदेमा सुबुंफोरखौ, जाय बिथांमोननि गोख्रों हेफाजाब आरो मददनि थाखाय
              भारत हादरनि मोनसे मख'जाथाव जारिमिनारि BTC गोरोबथाया जालांबाय।
              बेफोर गासैबो जारिमिननि बिलाइआव सनानि हांखोजों लिरजानानै थागोन।
              समनि दाहाराबो इयुन जोलैफोरनो बेखौ गोसोखां होगोन। माखासे मेगन गोसा
              सुथुरफ्रा बांसावनाय बादि BTC आ दिनै सोरबा मोनसे मख'जाथाव हारिनि
              थाखायल' जानानै थायाखै। BTC खौ गावनि असे बिमा बादि मानिना लानायनि
              गोसोथिखौ BTC नि साफ्रोम नोगोरारिफ्रा सोरजिना लानो हानांगोन। आसामनि
              साफ्रोम नोगोरारिफ्रा गोसोआव लाखिनांगोन दि-BTC is a part of Assam.
              BTC is not only for Bodos. BTC नि जौगानाया आसामनि जौगाखांनायखौनो
              फोरमायगोन। दिनै हारिनि मुङाव, राव, दोहोरोम, गाबनि मुङाव जोंनि
              गेजेराव फाराग लाबोनानै BTC आव दिदोमथि गैयै थासारि एबा लोरबां
              खालामनो माखासे गाज्रि गोहोफ्रा नाजाखोमागासिनो दं। बोसोर बोसोर
              जौथाय नाडै गोरोबलायनायनि गेजेरजों राइजो जाबोना फैनाय बर' बर'नङै,
              हिन्दु-मुसलमान, खुष्टयननि गेजेराव दिनै गावस्रानाय लाबोनानै
              गोरोबलायनायनि दिरुंखौ बस'नो बिसोर नाजाखोमादों। BTC नि गासै
              नोगोरारिफ्रानो बे बिथिडाव सांग्रां जाथारनांगोन । राजखान्थिनि मुङाव
              जों जाहाथे गावस्राना थाया बे बिथिङाव गासै थाखोनि राइजोफ्रा
              सांग्रां रौनियाफोरबादि बिबान बानस'लायनांगोन। दिनै जों आसामाव,
              गुबैयै BTC नि सिङाव थानाय हारि-हारिसाफोरनि मान थाखोखौ जायखिजाया
              जाहोन, जायखि बिथिङावनो हायलांनो माब्लाबाबो खाबु होनाय नङा । दिनै
              BTC नि सिङाव थानाय कस-राजबंसि, आदिबासीफ्रा जनजाति मान थाखो
              नागिरदों, बिसोरनि दाबिखौ जोंबो मदद खालामदों। ULFA, NDFB बादि
              आफादनि जेंनाखौ सुस्रांनांनायनि थाखाय मिरु सरकारखौ नारसिनबाय थानाय
              जादों। थांनाय सानफोराव जालांनाय हारियारि दाङाबाजिनि जाउनाव गोबां
              सुबुंफ्रा जिउ खोमानांनाय, बेंगुरा जानांनाय, दोहोन-दौलत खहा जानायखौ
              सुफुंनायनि थाखाय जोंनि अनगायै आसामनि रावबो राजखान्थि हानजायानो राव
              होबोआखै। खहा जाजानाय नखर एबा सुबुंफोरनो फिन गायसनथाइनि थाखाय BTC
              सरकारा बायदि मदद आरो हेफाजाब खालामना होदों। खहा जाजानाय
              नखरफ्रोमनोबो फिन गायसनथाइनि थाखाय 5 लाख रां अनसुंथाइ होनांगौ
              होन्नानै मिरु सरकारनिसिम गोख्रोङै दाबि खालामबोनाय जादों। नै
              दाखालिसो 19 जानुवारी खालाराव भारतनि गाहाइ मन्थ्रि नरेन्द्र मदी बि
              थाङा कक्राझाराव दावबायफैयोब्ला बे मोनसे दाबिखौ फिन दैखांफिननाय
              जादों। जों गोथौवै फोथायोदि जों रावबो रावखौबो नागारलायनानै सोलिनो
              हाया। बेखायनो, गासैनिबो दुखु-जारलाफोरखौ जानगार खालामनानै
              जेंनाफोरखौ सुफुंनायनि थाखाय जिरायनाय गैयै मावलांनो नाजादों। गासै
              थाखोनि राइजोफोरनि मदद, अन्नाय-बोर सारस्रिनाय, सरकारि
              मावख'गिरिफोरनि गोथार गोसोयै मावफुंनायजों BTC नि आबुं जौगालांनायनि
              थाखाय गासैबो रोखोमनि हेंथाखौ सौसिनानै दावगालांनो हागोन जों बेखौ
              फोथायो। जों लुबैयो मोनसे जौगाखां BTC, मोनसे जौगाखां आसाम। जेराव
              गासै हारि, राव, दोहोरोमारि सुबुंनि जिउ आरो दोहोन-दौलतआ रैखाथि
              गोनां जागोन। आरो बे थांखियैनो, BTC सरकारा गासै थाखोनि
              नोगोरारिफोरनि बानजायनायनि थाखाय हादरनि मानगोनां गाहाइ मन्थ्रिनि
              फारसेनिफ्राइ मोननो हानाय SPECIAL PACKAGE 1000 कौटि रां आरो SPECIAL
              CENTRAL ASSISTANCE (SCA) नि रांखौ बायदि बिफानाव राननानै BTC नि
              आबुं जौगानायनि थाखाय खामानि मावलांनो इयुन मावफारि आजावनाय जादों।
              {'\n'}जोबनायाव गासै राइजोफोरनि हेफाजाब-मदद आरो बोर सारस्रिनाय
              नागिरनाय जाबाय।
            </Text>
            <Text style={styles.body}>गोजोनथों-</Text>
            <Text style={styles.body}>
              मुश्री हाग्रामा महिलारी
              {'\n'}बि टि सि गाहाइ
              {'\n'}कक्राझार
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bodyHeader}>
              आदर्श बि टि सि दानायनि थाखाय जोंनि थांखिफोर:
            </Text>
            <Text style={styles.body}>
              🔸बि टि सिनि सिडाव ID नम्बर गैजायै गोरिब थाखोनि नखरारिफोरनि थाखाय
              बोसोरफायाव 8,000 (दाइन रोजा) आदर्श न' लुनानै होनाय (गंफा न'आव 1.50
              लाख रां) जागोन।
              {'\n'}🔸आइजो जौगाथाइनि थाखाय बोसोरफायाव गं 20,000 (नैजि रोजा)
              लेदिस साइकेल रान्नानै होनाय जागोन।
              {'\n'}🔸20,000 (नैजि रोजा) जि सुथाबग्रा मेसिन (एस टि नडै
              आइजोफोरनो) रान्नानै होनाय जागोन।
              {'\n'}🔸बि टि सिनि गाहाइ थावनि कक्राझाराव गासैबो हारिसाफोरनि
              सुबिदानि थाखाय 14 (जिब्रै) थालानि जिरायसालि न' लुनाय जागोन।
              {'\n'}🔸फकिराग्राम, गसाइगाव, बासुगाव, गरेस्वर, टंला, उदालगुरि
              बायदिखौ लाफानानै माजबाटनिफ्राइ संकससिम मोनफ्रोम रेल क्रसिंआवनो
              अभार ब्रिज फारियै लुफुंनायनि राहा लानाय जादों।
              {'\n'}🔸बि टि सिनि आबादारि समाजखौ गासैबो बिथिङाव जौगाखां होनायनि
              थाखाय BTC FARMER HAPPY GREEN PROJECT नि गेजेरजों राहा लामा लानाय।
              खोथिया फोनाय, माय गायनाय, माय हानाय, मारोन होनाय बादि बे
              प्रोजेक्टनि सिङाव गासैबो थागोन।
              {'\n'}🔸BODOLAND MEDIA INSTITUTE, बरमायाव लुफुंनाय जागोन।
              {'\n'}🔸आसाम साहित्य सभानि जौथाय बोसोरारि खुंथाइनि थांखियै बि टि
              सिनि दरब्रै जिल्लायाव आसाम साहित्य सभा भवन लुफुंनाय जागोन।
              {'\n'}🔸बि टि सिनि बाइजोआव थानाय बर' साहित्य सभानि जिल्ला
              आफादफोरनि थाखाय मावखुलि न' लुनाय जागोन।
              {'\n'}🔸बड 'लेण्ड बुहुम फरायसालियाव बिज्ञान भवन लुफुंनाय जागोन।
              {'\n'}🔸भेन्सार आरो गावखोन्दो आरि फरायसालि आरो फरायसालिमाफोरनि
              जौगाथाइनि थाखाय राहा लानाय जागोन।
              {'\n'}🔸कक्राझारनि दतमायाव थानाय बड'फा उपेन्द्र नाथ ब्रह्म
              मांखरसालिखौ गाब गोनाङै लुफुंनायनि थाखाय राहा लानाय जादों।
              {'\n'}🔸कक्राझाराव बड 'लेण्ड सरकारि सेबखांसालि लुफुंनायनि थाखाय
              राहा लानाय जादों।
              {'\n'}🔸कक्राझाराव मोनसे जौगा मानथाखोनि राइजोआरि बास लाखिग्रा
              थावनि लुफुंनायनि राहा लानाय जादों।
              {'\n'}🔸बि टि सिनि गंफ्रोम जिल्लानि सदर थावनिआव बिजाब बाख्रि
              लोगोसे अदिटरियाम लुफुंनाय जागोन।
              {'\n'}🔸बरमा, भबानिपुर, रङियाआव गंफायै जौगा मानथाखोनि बिजाब बाख्रि
              लोगोसे अदिटरियाम लुफुंनाय जागोन।
              {'\n'}🔸गोर (कठालबारी) बन्ध सिधनीआव कमिउनिति हल लुफुंनाय जागोन।
              {'\n'}🔸CDPO (ICDS) नि थाखाय अरायथा मावखुलि न' लुफुंनाय जागोन।
              {'\n'}🔸दिपलाय बिलोनि सोरगिदिं वाल आरो हान्थिग्रा लामा बानायनाय
              जागोन।
              {'\n'}🔸फ्लरिकेन गार्देनखौ जौगा मानथाखोनि खालामनाय जागोन।
              {'\n'}🔸बिनेस्वर ब्रह्म इन्जिनियारिं कलेजनि सोरगिदिं वाल आरो
              लेबरेटरि लुफुंनायनि थाखाय राहा लानाय जादों।
              {'\n'}🔸गवालपरीया ल'क संगीतनि रानी पद्मश्रि प्रटिमा बरुवा पान्दे
              हारिमुआरि भवन, गौरिपुराव लुनायनि राहा लानाय जादों।
              {'\n'}🔸रड़ियानि थैलांनो हमनाय एप'ल' उद्योगखौ फिन फोथांफिन्नायनि
              थाखाय बा कौटि रां होनाय जागोन।
              {'\n'}🔸धुबुरी जिल्ला सदरआव जनजाति फरायसाफोरनि थाखाय थाग्रा खुलि
              लुफुंनायनि राहा लानाय जादों।
              {'\n'}🔸गौरिपुराव डः आम्बेदकार भवन, सिलाराय भवन, मुसाफिर खान्ना
              आरो हिन्दी रावारी फोरनि थाखाय बिबाह भवन लुफुंनाय जागोन।
            </Text>
            <Text style={styles.bodyHeader}>
              जिल्ला नाडै जोंनि आजावनाय बिथांखिफोर:
            </Text>
            <Text style={styles.bodyHeader}>कक्राझार जिल्लाः</Text>
            <Text style={styles.body}>
              🔸कारिगावनिफ्राइ कक्राझार सहरसिम हाबलांनाय लामाखौ ब्रै लेण्ड
              लामासिम जौगाखां होनाय जागोन।
              {'\n'}🔸गोथौवै दै बोखांनाय आरो जगायनाय बिथांखिनि जोहै सरलपारा आरो
              उल्टापानीआव लोंग्रा दै मोनलॉनायनि राहा लानाय जागोन।
              {'\n'}🔸कक्राझारनि GOVT. B.ED COLLEGE आव थाम महलनि गार्लस हस्तेल
              लुफुंनाय जागोन।
              {'\n'}🔸हाथिगड़ पागला FLOW IRRIGATION बिथांखिखौ मावफुंनाय जागोन।
              {'\n'}🔸नाराबारी, दावखिबारी आरो सरायखला दामोदरपुर लामाखौ गुवार
              खालामनायनि राहा लानाय जागोन।
              {'\n'}🔸कसुगावआव थाखानाय AGRICULTURE CAMPUS आव AGRICULTURE
              KNOWLEDGE CENTER लुफुंनाय जागोन। गोदान नोजोर
              {'\n'}🔸दामरा, मायारघाट, श्रीरामपुर, देबिटला, सनाजुलि आरो
              सालनाजुलिआव FLOOD IRRIGATION CONTROL SCHEME नि राहा लानाय जागोन।
              {'\n'}🔸हलं बाजारनिफ्राइ गग्रापुरि थांनाय लामा, गसाइगाव,
              सापटग्राम, भावरागुरि, कसुगाव लामाखौ फिन बानायफिन्नाय आरो पाक्का
              खालामनाय जागोन।
              {'\n'}🔸भारला दैमानि सायाव (सान्तिपुराव), हेल दैमानि सायाव
              सिन्दुरिझरानिफ्राइ मखिगामि थांनाय लामायाव RCC दालां बानायनाय
              जागोन।
              {'\n'}🔸कसुगाव, राइमना जलेस्वरी लाहनपुरनिफ्राइ गुरुफेला सिंगि
              बिलसिम (भाया हातिगड़, थायगिरगुरि, राभापारा, 1 नं सिंगिबिल) थांनाय
              लामायाव गं 2 RCC दालांखौ हमनानै 9 KM लावथाइनि लामा बानायनाय जागोन।
              {'\n'}🔸गौरां दैमानि कमलाझरा ओन्सोलाव हा खुरखानायखौ होबथानायनि
              थाखाय राहा लानाय जागोन।
              {'\n'}🔸सिटिला तितलिगुरि PWD लामानि लंगा दैमानि सायाव धिपधिपि
              गामियाव गंसे RCC दालां लुफुंनाय जागोन।
              {'\n'}🔸जगदै-फकिराग्राम लामाखौ (6.5 KM) फिन बानायफिन्नाय आरो
              पाक्का खालामनाय जागोन।
              {'\n'}🔸रंगा दैमानि मोन्नैबो रुबुंनि आफां बाहागो हा खुरखानायखौ
              होबथानायनि थाखाय राहा लानाय जागोन।
              {'\n'}🔸टिपकाइनिफ्राइ सापतग्रामसिम (बेलगुरि जानानै),
              तुलसिबिलनिफ्राइ सापतग्रामसिम (गसाइगाव कलेजनिफ्राइ टकियामारी
              जानानै), गुवाबारी बाजारसिम थांनाय लामाखौ बानायनायजों लोगोसेनो
              फुवारनाय जागोन।
              {'\n'}🔸 फकिराग्रामनि मागुरमारिनिफ्राइ मधुपुरिसिम (5 KM लावथाय)
              थांनाय लामाखौ पाक्का खालामनायजों लोगोसे दहायाव RCC BOX CULVERT
              बानायनाय जागोन।
              {'\n'}🔸बासन्ति मन्दिर, फकिराग्राम ओन्सोल बायदिआव हेल दैमानि हा
              खुरखानायखौ होवथानायनि थाखाय राहा लानाय जागोन ।{'\n'}🔸संकोस दैमानि
              सायाव भेलुकुवा गामिआव RCC दालां बानायनि थाखाय राहा लामा जागोन।
              {'\n'}🔸ACADEMIC FOOTBALL STADIUM, SWIMMING POOL, DIVING POOL,
              BADMINTON AND VOLLEY BALL INDOOR STADIUM बानायनाय जागोन।
              {'\n'}🔸जाकातिनिफ्राइ थाइगिरगुरिसिम जाकाति दैमानि हा खुरखानायखौ
              होबथानायनि राहा लानाय जागोन।
            </Text>
            <Text style={styles.bodyHeader}>सिरां जिल्ला :</Text>
            <Text style={styles.body}>
              🔸बिजनीनिफ्राइ बिष्णुपुरसिम 16KM पाका लामा बानायनाय जागोन।
              {'\n'}🔸मोन 2 (नै) गेवलां बाजार मिरु लुफुंनाय जागोन-जैरे 3 नं
              विष्णुपुर आरो आनन्द बाजार।
              {'\n'}🔸बिष्णुपुरनिफ्राइ दैलंझारसिम पाका लामा बानायनाय जागोन।
              {'\n'}🔸बिजनीआव INDOOR आरो OUTDOOR STADIUM लुनाय जागोन।
              {'\n'}🔸बेतबारी आलुखुन्दा, मरा मानास दैमानि सायाव RCC दालां
              लुफुंनाय जागोन।
              {'\n'}🔸रानीपुरनिफ्राइ आवजारसिम पाक्का लामा बानायनाय जागोन।
              {'\n'}🔸बल्लमगुरि, कुकलुं दैमानि सायाव RCC दालां बानायनाय जागोन।
              {'\n'}🔸बिजनी आव MODERN MARKET SHET लुफुंनाय जागोन।
              {'\n'}🔸(i) जांखा बान्दो (पुब माख्रा)। (ii) गार्लाझरा बान्दो, (पुब
              गुमारगाव) बानायनाय जागोन।
              {'\n'}🔸सालागुरिनिफ्राइ मालिभिता, पानबारी बाजारनिफ्राइ मानाश्रीसिम
              (बगिधरा) लामा बानायनाय जागोन।
              {'\n'}🔸बिजनीआव संकरदेब हारिमुआरी भवन लुफुंनाय जागोन।
              {'\n'}🔸दांतलनिफ्राइ रुनिखातासिम थांनाय लामाखौ बानायनाय जागोन।
              {'\n'}🔸VERTICAL EXTENSION काजलगाव जिल्ला मिरु बानायनाय जागोन।
              {'\n'}🔸नाङलभाझयाव, आइपवालीयाव आइ दैमानि सायाव, कुसाकातिआव सम्पा
              दैमानि सायाव दालां बानायनाय जागोन।
              {'\n'}🔸अग्रङाव जाक्रा बान्दो बानायनाय जागोन।
              {'\n'}🔸सरलभाङा दैमायाव रानीघाटनिफ्राइ सरलभाङासिम मोन्नैबो रुबुङाव
              माथावरि बानायनाय जागोन।
              {'\n'}🔸सापागुरिनि ब्रह्म मन्दिरनिफ्राइ धालिगाव लामानि फारनैथिंबो
              मोन्नै RCC दालांजों लोगोसे नाला बानायनाय जागोन।
            </Text>
            <Text style={styles.bodyHeader}>बाकसा जिल्ला :</Text>
            <Text style={styles.body}>
              🔸पाग्लादिया दैमानि सायाव (नयाबस्ति-कुमारीकाता फोनांजाब लामा) RCC
              दालां बानायनाय जागोन।
              {'\n'}🔸बरमानिफ्राइ धमधमासिम थांनाय लामाखौ (14 KM, 12 टा RCC दाली)
              बानायनाय जागोन।
              {'\n'}🔸31 नं राजा लामा बरमानिफ्राइ बातासारासिम मरापाग्ला दैमायाव
              मोन्नैबो रुगुङाव माथाउरि बानायनाय जागोन।
              {'\n'}🔸कक्लाबारीयाव थानाय AGRICULTURE RESEARCH & TRAINING
              INSTITUTE खौ फिन बानायफिन्नाय जागोन।
              {'\n'}🔸जारिपारानिफ्राइ बागानपारासिम पाक्का लामा बानायनाय जागोन।
              {'\n'}🔸उदालगुरिनिफ्राइ गबरधनासिम धांनाय लामा आरो बेकि दैमानि
              सायाव RCC दाला बानायनाय जागोन।
              {'\n'}🔸जाक्लिभिटानिफ्राइ बुनमाजासिम थांनाय लामाखौ बानायनाय जागोन।
              {'\n'}🔸साहा बिजनीनिफ्राइ SS Ltd. जानानै सालबारी-बाहबारी लामाखौ
              पाक्का खालामनाय जागोन।
              {'\n'}🔸सरुपेटा-भुत्रापारानिफ्राइ हाथिनापुर सकसिम थांनाय लामायाव
              RCC दालां बानायनाय जागोन।
              {'\n'}🔸31 नं राजा लामानि सेराव थानाय क़दमटलायाव जौगा मानथाखोनि
              माय सौग्रा मिल बानायनाय जागोन।
              {'\n'}🔸बरिमाखानिफ्राइ सुमतियापारसिम पाका लामा बानायनाय जागोन।
              {'\n'}🔸दुमनिनिफ्राइ सौधुरीपारासिम लामा बानायनाय (RCC दालांजों
              लोगोसे) जागोन।
              {'\n'}🔸दिहिरा मंगि दैसा गुदि फरायसालिनिफ्राइ अग्रं जानानै बाघमारा
              फुंबिलि बाजारसिम लामा बानायनाय जागोन।
              {'\n'}🔸सारिआलिनिफ्राइ बाघमारा स 'क जानानै सोनाब रिहाबारीसिम लामा
              बानायनाय जागोन।
              {'\n'}🔸पहुमारा दैमानि सायाव RCC दा लां बानायनाय जागोन।
              {'\n'}🔸आंलिसङा दैमानि मोन्नैबो रुगुङाव माथाउरि बानायनाय जागोन।
              {'\n'}🔸काटलिगावनिफ्राइ 2 नं लकपालासिम, जालाहनिफ्राइ मुसलपुरसिम,
              दुमनिनिफ्राइ दिघलदडासिम, पाखामारनिफ्राइ सुबनखातासिम मोन 4 (ब्रै)
              टा लामा बानायनाय जागोन।
              {'\n'}🔸मैथाबारिनि जरा बान्दोखौ बानायनाय जागोन।
              {'\n'}🔸बावदिया बान्दोखौ (1 नं सैबारी) बानायनाय जागोन।
              {'\n'}🔸गरेस्वरनिफ्राइ गान्धिबारीसिम लामा बानायनाय जागोन।
              {'\n'}🔸दहा आंगारकाटानिफ्राइ आनन्द बाजारसिम थांनाय (12 KM) लामाखौ
              बानायनाय जागोन।
              {'\n'}🔸बालाहातिनिफ्राइ बरबेरा फोनांजाब लामाखौ बानायनाय जागोन।
              {'\n'}🔸पार्किजुलिनिफ्राइ पाहारपुरसिम लामा बानायनाय जागोन।
              {'\n'}🔸बेकि दैमानि गाहाइ बाहागोनि (नारायणगुरि) हा खुरखानायखौ
              होबथानायनि राहा लानाय जागोन।
              {'\n'}🔸सुक्लाय दैमानि गान्धि सकनिफ्राइ सैनिगाव, तामुलपुरनिफ्राइ
              भेरगाव जानानै KNP लामाखौं बानायनाय जागोन।
              {'\n'}🔸भोगपुरनिफ्राइ राबां बर' बाजारनि लामाखौ पाक्का खालामनाय
              जागोन।
              {'\n'}🔸पाखामारयाव दिरिं दैमानि सायाव RCC दालां लुनाय जागोन।
              {'\n'}🔸बरमानि कालजाराव SPORTS COMPLEX (JULEE MAIDAN) लुनाय जागोन।
              {'\n'}🔸बरमानिफ्राइ नायायणपुरसिम थांनाय लामाखौ (भालुकदा स'क
              मुसलपुर जानानै) बानायनाय जागोन।
              {'\n'}🔸तामुलपुराव HANDLOOM MEGA CLUSTER बानायनाय जागोन।
              {'\n'}🔸तामुलपुराव INDOOR STADIUM बानायनाय जागोन।
              {'\n'}🔸धनश्रि दैमानि हा खुरखानायनि सा बाहागो ताराबारि, दलनि
              बस्ति, नाव हेरुवा, नं 1 राङ्खपानी, कुकुराबाही आरो गाहायनि बाहागो
              बर' बाजारसिम होबथानायनि राहा लानाय जागोन।
              {'\n'}🔸पागला दैमानि हा खुरखानाय बांगालबस्ति, पलासबस्ति, टेकलिबिल
              आरो बगियापारायाव होबथानायनि राहा लानाय जागोन।
              {'\n'}🔸N.H. 15 नि पानिखेति लामानिफ्राइ पद्मपुखुरि जानानै तांनि
              LINK ROAD पाक्का लामा बानायनायनि राहा लानाय जागोन।
              {'\n'}🔸उदालगुरि-खारुपेतिया लामाखौ पाक्का लामा खालामनाय (बि टि सि
              बाहागो) जागोन।
              {'\n'}🔸गार'गावआव RCC दालां बानायनायनि राहा लानाय जागोन।
              {'\n'}🔸फुलगुरियाव RCC दालां बानायनायनि राहा लानाय जागोन।
              क्षुहुराबारी आरो सुबरा सुबुरी गामिनि पागला दैमानि सायाव RCC दालां
              बानायनायनि राहा लानाय जागोन।
              {'\n'}🔸झारगावआव तालपानी दैमानि सायाव RCC दालां बानायनाय जागोन।
              {'\n'}🔸तियापुखुरी (दलंघाट) ननाय दैमानि सायाव RCC दालां बानायनाय
              जागोन।
              {'\n'}🔸बालिपारायाव नआ दैमानि सायाव RCC दालां बानायनाय जागोन।
              {'\n'}🔸धनश्रि दैमानि सायाव RCC दालां बानायनायनि राहा लानाय जागोन।
              {'\n'}🔸कबिरआलि भकटपारा जानानै रानीपुख्रिआव RCC दालांजों लोगोसे
              पाक्का लामा बानायनायनि राहा लानाय जागोन।
              {'\n'}🔸5 नं धनश्रिआव DAIRY FARM जों लोगोसे गायखेर दिहुनग्रा आरो
              MILK PROCESSING CENTER लुनाय जागोन।
              {'\n'}🔸माजबात नोगोरनिफ्राइ देवालखन्द हुगराजुलि लामाखौ पाका
              खालामनाय जागोन।
              {'\n'}🔸सिलंखुति गढ़ बस्ति गुदि फरायसालिनिफ्राइ माजबातसिम थांनाय
              लामाखौ RCC दालांजों लोगोसे पाका बानायनाय जागोन।
              {'\n'}🔸नाराबारि पाठकपुर लामाखौ माजबाटनिफ्राइ पाठकपुरसिम पाक्का
              खालामनाय जागोन।
              {'\n'}🔸रौटा स्टेसन भानु स'क जानानै बादागाव लामाखौ पाक्का खालामनाय
              जागोन।
              {'\n'}🔸उदालगुरियाव गर्खा फरायसाफोरनि थाग्राखुलि लुफुंनाय जागोन।
              {'\n'}🔸उदालगुरियाव आदिवासी फरायसाफोरनि थाग्राखुलि लुफुंनाय जागोन।
              {'\n'}🔸माजबाट आव ड आम्बेदकार भवन लुफुंनाय जागोन।
              {'\n'}🔸उदालगुरिआव सब्यसासी राभा फरायसाफोरनि थाग्राखुलि लुफुंनाय
              जागोन।
              {'\n'}🔸रौटायाव सिलाराय भवन लुफुंनाय जागोन।
              {'\n'}🔸उदालगुरिआव बिपुल महन्त गोसोखां फरायसाफोर थाग्रा न'
              लुफुंनाय जागोन।
              {'\n'}🔸उदालगुरिआव लक्ष्मीनाथ बेजबरुवा भवन लुफुंनाय जागोन।
              {'\n'}🔸भैरबकुण्डआव बर' आरो गुबुन गुबुन एस.टि सुबुंफोरनि हारिमुआरी
              CULTURAL HERITAGE सं-रैखाथि होनायनि थाखाय CULTURAL HALL लुफुंनाय
              जागोन।
              {'\n'}🔸टंलानि बर जालाहआव INDOOR STADIUM लुफुंनाय जागोन।
              {'\n'}🔸तेजियापारा भकटपारा लामाखौ बानायनाय जागोन।
              {'\n'}🔸सुक्लाय दैमानि हा खुरखानायखौ होबथानायनि राहा लानाय जागोन ।
              {'\n'}🔸सामरां दैमानि हा खुरखानायखौ होबथानायनि राहा लानाय जागोन।
              {'\n'}🔸ननाय दैमानि हा खुरखानायखौ होबथानायनि राहा लानाय जागोन।
              {'\n'}🔸घाग्रा-भुटियासां लामा (ककली दैमायाव RCC दालां) खौ पाक्का
              बानायनाय जागोन।
              {'\n'}🔸बादला पारा राजगड़ लामाखौ (नाला दैमाआव RCC दालां) पाक्का
              लामा बानायनाय जागोन।
              {'\n'}🔸सियालबारी बैनारी लामाखौ बानायनाय जागोन।
              {'\n'}🔸भेरगावनि आइ टि आइनि थाखाय खुंथाइखुलि न' आरो फरायसुलीफोरनि
              थाखाय थाग्रा न' बानायनाय जागोन।
              {'\n'}🔸अरांआव OVERHEAD WATER TANK बानायनाय जागोन ।
            </Text>
            <Text style={styles.footer}>Stay tuned for new vission of BPF</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default VissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flagGradient: {
    width: width,
    height: height,
    position: 'absolute',
    bottom: 0,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  chapter: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  bodyHeader: {
    color: '#000',
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: '500',
    marginTop: 10,
  },
  body: {
    color: '#000',
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10,
  },
  footer: {
    color: 'red',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
  },
});
