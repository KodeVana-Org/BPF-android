import React from 'react';
import {ScrollView, StyleSheet, Dimensions, Text, View} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SixthSheduleScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <NavHeader title={'6th Shedule of BTC'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>SIXTH SCHEDULE</Text>
            <Text style={styles.subHeader}>[Articles 244(2) and 275(1)]</Text>
            <Text style={styles.subHeader}>
              Provisions as to the Administration of Tribal Areas in 1 [the
              States of Assam, Meghalaya, Tripura and Mizoram]
            </Text>
            <Text style={styles.bodyHeader}>
              1. Autonomous districts and autonomous regions:—
            </Text>
            <Text style={styles.body}>
              (1) Subject to the provisions of this paragraph, the tribal areas
              in each item of 3 [ 4 [Parts I, II and IIA] and in Part III] of
              the table appended to paragraph 20 of this Schedule shall be an
              autonomous district.
              {'\n'}(2) If there are different Scheduled Tribes in an autonomous
              district, the Governor may, by public notification, divide the
              area or areas inhabited by them into autonomous regions.
              {'\n'}(3) The Governor may, by public notification:—
            </Text>
            <Text style={styles.body}>
              (a) include any area in 3 [any of the Parts] of the said table,
              {'\n'}(b) exclude any area from 3 [any of the Parts] of the said
              table,
              {'\n'}(c) create a new autonomous district,
              {'\n'}(d) increase the area of any autonomous district,
              {'\n'}(e) diminish the area of any autonomous district,
              {'\n'}(f) unite two or more autonomous districts or parts thereof
              so as to form one autonomous district, 5 [(ff) alter the name of
              any autonomous district,]
              {'\n'}(g) define the boundaries of any autonomous district:
            </Text>
            <Text style={styles.bodyHeader}>
              Provided that no order shall be made by the Governor under clauses
              (c), (d), (e) and (f) of this sub-paragraph except after
              consideration of the report of a Commission appointed under
              sub-paragraph (1) of paragraph 14 of this Schedule:
            </Text>
            <Text style={styles.body}>
              [Provided further that any order made by the Governor under this
              sub- paragraph may contain such incidental and consequential
              provisions (including any amendment of paragraph 20 and of any
              item in any of the Subs. by the State of Mizoram Act, 1986 (34 of
              1986), s. 39, for certain words (w.e.f. 20-2-1987). 2 Paragraph 1
              has been amended in its application to the State of Assam by the
              Sixth Schedule to the Constitution (Amendment) Act, 2003 (44 of
              2003), s. 2, so as to insert the following proviso after
              sub-paragraph (2), namely:— “Provided that nothing in this
              sub-paragraph shall apply to the Bodoland Territorial Areas
              District.” 3 Subs. by the North-Eastern Areas (Reorganisation)
              Act, 1971 (81 of 1971), s. 71(i) and Eighth Sch., for “Part A”
              (w.e.f. 21-1-1972). 4 Subs. by the Constitution (Forty-ninth
              Amendment) Act, 1984, s. 4, for “Parts I and II” (w.e.f.
              1-4-1985). 5 Ins. by the Assam Reorganisation (Meghalaya) Act,
              1969 (55 of 1969), s. 74 and Fourth Sch. (w.e.f. 2-4-1970). 6 Ins.
              by the North-Eastern Areas (Reorganisation) Act, 1971 (81 of
              1971), s. 71(i) and Eighth Sch. (w.e.f. 21-1-1972).
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.subHeader}>(Sixth Schedule)</Text>
            <Text style={styles.body}>
              Parts of the said Table) as appear to the Governor to be necessary
              for giving effect to the provisions of the order.]
            </Text>
            <Text style={styles.body}>
              (1). Constitution of District Councils and Regional Councils.—2
              [(1) There shall be a District Council for each autonomous
              district consisting of not more than thirty members, of whom not
              more than four persons shall be nominated by the Governor and the
              rest shall be elected on the basis of adult suffrage.]
              {'\n'}(2) There shall be a separate Regional Council for each area
              constituted an autonomous region under sub-paragraph (2) of
              paragraph 1 of this Schedule.
              {'\n'}(3) Each District Council and each Regional Council shall be
              a body corporate by the name respectively of “the District Council
              of (name of district)” and “the Regional Council of (name of
              region)”, shall have perpetual succession and a common seal and
              shall by the said name sue and be sued.
              {'\n'}(4) Subject to the provisions of this Schedule, the
              administration of an autonomous district shall, in so far as it is
              not vested under this Schedule in any Regional Council within such
              district, be vested in the District Council for such district and
              the administration of an autonomous region shall be vested in the
              Regional Council for such region.
              {'\n'}(5) In an autonomous district with Regional Councils, the
              District Council shall have only such powers with respect to the
              areas under the authority of the Regional Council as may be
              delegated to it by the Regional Council in addition to the powers
              conferred on it by this Schedule with respect to such areas.
            </Text>
            <Text style={styles.body}>
              Paragraph 2 has been amended in its application to the State of
              Assam by the Sixth Schedule to the Constitution (Amendment) Act,
              2003 (44 of 2003), s. 2, so as to insert the following proviso
              after sub-paragraph (1), namely:—
              {'\n'}“Provided that the Bodoland Territorial Council shall
              consist of not more than forty-six members of whom forty shall be
              elected on the basis of adult suffrage, of whom thirty shall be
              reserved for the Scheduled Tribes, five for non-tribal
              communities, five open for all communities and the remaining six
              shall be nominated by the Governor having same rights and
              privileges as other members, including voting rights, from amongst
              the un-represented communities of the Bodoland Territorial Areas
              District, of which at least two shall be women.”
              {'\n'}Paragraph 2 has been amended in its application to the State
              of Assam by the Sixth Schedule to the Constitution (Amendment)
              Act, 1995 (42 of 1995), s. 2, so as to insert the following
              proviso after sub-paragraph (3), namely:—
              {'\n'}“Provided that the District Council constituted for the
              North Cachar Hills District shall be called as the North Cachar
              Hills Autonomous Council and the District Council constituted for
              the Karbi Anglong District shall be called as the Karbi Anglong
              Autonomous Council.”
              {'\n'}*Paragraph 2 has been amended in its application to the
              State of Assam by the Sixth Schedule to the Constitution
              (Amendment) Act, 2003 (44 of 2003), s. 2, so as to insert the
              followoing proviso after the proviso in sub-paragraph (3),
              namely:—
              {'\n'}“Provided further that the District Council constituted for
              the Bodoland Territorial Areas District shall be called the
              Bodoland Territorial Council.”
              {'\n'}2 Subs. by the Assam Reorganisation (Meghalaya) Act, 1969
              (55 of 1969), s. 74 and Fourth Sch., for sub-paragraph (1) (w.e.f.
              2-4-1970).
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default SixthSheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  header: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  subHeader: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  bodyHeader: {
    color: '#000',
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: '500',
    marginTop: 5,
  },
  body: {
    color: '#000',
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10,
  },
  bodyTableContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
});
