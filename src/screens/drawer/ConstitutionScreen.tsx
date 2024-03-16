import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const ConstitutionScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <NavHeader title={'Constitution'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textContainer}>
            <Text style={styles.chapter}>Chapter-I</Text>
            <Text style={styles.header}>Preamble</Text>
            <Text style={styles.body}>
              We , the members of Bodoland Peopes Front or BPF in short duly
              formed as per the resolution Vide No.3, adopted in the political
              Convention held on 4th and 5th December 2005, solemnly adopt and
              give ourselves this constitution of The Bodoland Peoples Front
              shall bear true faith and allegiance to the constitution of India
              as established by law and to the principles of democracy,
              socialism and secularism as enshrined in the Indian constitution,
              and also solemnly affirm our commitment to work for upholding the
              sovereignty, unity and integrity of India and also international
              understanding and emphasise on the development of scientific
              temper, providing social justice to all , and specially to women,
              children , old , physically challenged, weaker section of the
              society, promotion of education , safe guarding of cultural
              heritages of all and there by to bring all round to development of
              all sections of people of Bodoland as well as Assam.
            </Text>
            <Text style={styles.footer}>
              Substituted by constitution (First Amendment) Act, 2007 dated
              29/08/2007
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.chapter}>Chapter-III</Text>
            <Text style={styles.header}>DEOLOGY</Text>
            <Text style={styles.body}>
              1. To administrate the Bodoland and Assam as a whole through the
              principles of Democracy, Socialism and Secularism.
              {'\n'} 2. To work for the eradication of poverty and for the
              upliftment of the downtrodden people living in Bodoland and Assam
              as a whole.
              {'\n'}3. To work for strengthening the Indian Nationalism
              providing due respect to the identities of all section of people.
              {'\n'} 4. To strive for the all-round development of the people of
              Bodoand as well as Assam.
            </Text>
            {/* <Text style={styles.footer}></Text> */}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.chapter}>CHAPTER-III</Text>
            <Text style={styles.header}>DEFINATION</Text>
            <Text style={styles.body}>
              In this constitution, unless the context otherwise requires
              'CONSTITUTION' means the constitution of the Bodoland Peoples
              Front.
              {'\n'}'RULING PARTY' means the party having majority members in
              the respective houses either inn the Legislative Assembly of
              Bodoland, Assam Assembly or the Indian parliament.
              {'\n'}'CENTRAL WORKING COMMITTEE' means the apex body of the party
              elected for the whole term of office to decide the matters for the
              party.
              {'\n'}'DISTRICT COMMITTEE' means the apex body in civil
              sub-divisional level elected for the full terms of office.
              {'\n'}'BLOCK COMMITTEE' means the committee at the Bodoland
              constituency level elected for the full terms of office.
              {'\n'}'PRIMARY COMMITTEE' means the committee constituted within
              the VCDC area holding full terms of the office.
            </Text>
            <Text style={styles.header}>OUTSIDE BODOLAND</Text>
            <Text style={styles.body}>
              1. District Committee means the apex body constituted within the
              Civil Sub-Division or District level holding office for full terms
              of the office.
              {'\n'}2. Block Committee means the body constituted within the
              Civil Block Office or Assam Assembly segment level holding office
              for full term.
              {'\n'}3. Primary Committee means the body constituted within the
              Gaon Panchayat (GP) level holding office for full term.
              {'\n'}4. 'STATE' means the state of Assam.
              {'\n'}5. 'MEMBER' means a person believing in the objectives,
              plans and policies of the party.
            </Text>
            {/* <Text style={styles.footer}></Text> */}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.chapter}>Chapter-IV</Text>
            <Text style={styles.body}>
              1. Name of the party: Bodoland Peoples Front or BPF.
              {'\n'}2. Head Office: Kokrajhar.
              {'\n'}3. Area of Operation: Bodoland area and Assam.
              {'\n'}4. Term of Office: 3 years.
            </Text>
            <Text style={styles.bodyHeader}>5. AIMS AND OBJECTIVES</Text>
            <Text style={styles.body}>
              (a) To work for the sovereignty and integrity of the country based
              on democracy, socialism and secularism.
              {'\n'}(b) To work for the political rights, economic development
              and social justice to all.
              {'\n'}(c) To make Bodoland a model and self-sufficient by
              influencing the state Govt. of Assam and the Govt. of India to
              explore the abundant natural resources like water, forest,
              minerals and human resources.
              {'\n'}(d) To work to free nationalism from the prejudices of
              castes, religions and languages to stand by the principles of
              co-operation, trust, tolerance, fraternity and co-existence.
              {'\n'}(e) To influence the Govt. of Assam, the Govt. of India and
              the national and international financial and industrial
              institutions to utilize their capacities to invest for the all
              round economic development of Bodoland.
              {'\n'}(f) To bring reforms in the field of education to suit
              present conditions.
              {'\n'}(g) To implement the Bodo Accord signed by B.L.T., Assam
              Govt. and the Govt. of India in letter and spirit as soon as
              possible with co-operations from all concerned.
            </Text>
            {/* <Text style={styles.header}></Text> */}
            <Text style={styles.footer}>
              Substituted by Constitution (First Amendment) Act, 2007 dated
              29/08/2007
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.body}>
              (iv) Active Members shall follow all for submitted to timbership
              drive and registration of members shall be to block committee
              office.
              {'\n'}(v) Block Committee shall forward thene Districtive Member
              to the respective District Committee and the District Committee
              shall forward the list of Active Member to the C.W.C for approval.
              {'\n'}(vi) Again every District Committee shall have the right to
              send 3 (three) active members to C.W.C. through election from
              among the Active Members.
            </Text>
            <Text style={styles.header}>
              The C.W.C. shall have the following office-bearers for a term of 3
              (three) years in the triennial conference:
            </Text>
            <View style={styles.bodyTableContainer}>
              <Text style={styles.body}>
                (a) President                             1
                {'\n'}(b) Vice President                    5
                {'\n'}(c) General Secretary              1
                {'\n'}(d) Secretaries                          5
                {'\n'}(e) Treasurer                              1
                {'\n'}(f) Organising Secretaries     20
                {'\n'}(g) Party Spokesmen               3
                {'\n'}(h) Publicity Cell                        5
                {'\n'}                                       Total = 41
              </Text>
            </View>
            <Text style={styles.body}>
              N.B: f. In the case of Organising Secretaries if the number of
              District Committee increase then the number may be increased
              accordingly.
              {'\n'}g. There shall be one Head Spokesmen.
              {'\n'}h. There shall be one Convenor
            </Text>
            <Text style={styles.bodyHeader}>
              A. POWER AND FUNCTIONS OF THE C.W.C.
            </Text>
            <Text style={styles.bodyHeader}>PRESIDENT:</Text>
            <Text style={styles.body}>
              (a) The President is the Head of the party and he shall exercise
              such powers and functions as decided in the C.W.C. according to
              the constitution.
              {'\n'}(b) The President shall preside over the meetings of the
              party.
              {'\n'}(c) The President shall delegate his power in writing to one
              of the Vice-Presidents to discharge the functions on his behalf
              when he feels it necessary.
              {'\n'}(d) During exigency the President may direct any of the
              secretaries to discharge special functions of the party when such
              situation warrants.
            </Text>
            <Text style={styles.bodyHeader}>VICE-PRESIDENTS:</Text>
            <Text style={styles.body}>
              One of the Vice-Presidents shall preside over the meetings and
              discharge functions when the President delegates his power in
              writing.
            </Text>
            <Text style={styles.bodyHeader}>GENERAL SECRETARY:</Text>
            <Text style={styles.body}>
              (a) The General Secretary is the Chief Executive Officer of the
              party who responsible for all execution of the decisions of the
              party.
              {'\n'}(b) The General Secretary will maintain all records and
              convene meetings as directed by the President of the party.
              {'\n'}(c) The General Secretary will prepare the annual records
              and obtain the approval of the C.W.C.
              {'\n'}(d) The General Secretary may entrust any of the Secretaries
              in writing to discharge the function on his behalf as and when he
              feels necessary.
            </Text>
            <Text style={styles.bodyHeader}>SECRETARIES:</Text>
            <Text style={styles.body}>
              (a) The Secretaries of the party shall help the General Secretary
              in discharging his functions of the party.
              {'\n'}(b) The Secretaries shall discharge functions of the party
              as delegated by the President and the General Secretary.
            </Text>
            <Text style={styles.bodyHeader}>TREASURER :</Text>
            <Text style={styles.body}>
              The Treasurer shall maintain the accounts of the party and prepare
              Financial Reports subject to the approval of the C.W.C. He shall
              also pass bills including T.A. and D.A. to the party workers
              subject to the approval of the President and the General
              Secretary.
            </Text>
            <Text style={styles.bodyHeader}>ORGANISING SECRETARIES:</Text>
            <Text style={styles.body}>
              The Organising Secretaries shall organize for the party according
              to the decision of C.W.C. and as instructed.
            </Text>
            <Text style={styles.bodyHeader}>PARTY SPOKESMEN:</Text>
            <Text style={styles.body}>
              The Party Spokesmen shall issue statements on party policies and
              strategies time to time as adopted again they shall issue
              statements on urgent matter related to party as and when it is
              necessary.
            </Text>
            <Text style={styles.bodyHeader}>PUBLICITY CELL:</Text>
            <Text style={styles.body}>
              Publicity Cell shall be responsible in discharging functions as
              authorised by the for publication of leaflet, poster, circulars,
              forms etc.
            </Text>
            <Text style={styles.bodyHeader}>B. QUORUM:</Text>
            <Text style={styles.body}>
              (i) Attendance of 1/3 (one-third) of total members of the C.W.C
              shall form the quorum of the C.W.C meeting.
              {'\n'}(ii) In the case of the major political strategies including
              amendment to the provisions of the constitution shall require
              attendance and voting of the 2/3 (two-third) members of the CWC in
              CWC meeting.
              {'\n'}(iii) In the case of adjourn CWC meeting attendance of ¼
              (one-fourth) members of the CWC shall form quorum.
            </Text>
            <Text style={styles.bodyHeader}>DISTRICT COMMITTEE :</Text>
            <Text style={styles.body}>
              The committee shall be formed with the following members:
              {'\n'}(a) President/Secretaries of Block committees.
              {'\n'}(b) 5 (five) members from each Block committee elected in
              their triennial conference.
              {'\n'}(c) The President of District Committee shall nominate 5
              members to DWC of the District Committee who shall not be entitled
              voting rights.
              {'\n'}(d) The triennial conference of the district committees must
              be completed before C.W.C. triennial conference. The district com
              mittee officials shall be as follows:
            </Text>
            <View style={styles.bodyTableContainer}>
              <Text style={styles.body}>
                (a) President                           1
                {'\n'}(b) Vice President                  4
                {'\n'}(c) General Secretary            1
                {'\n'}(d) Secretaries                        4
                {'\n'}(f) Organising Secretaries    8
                {'\n'}(e) Treasurer                            1
                {'\n'}                                      Total = 19
              </Text>
            </View>
            <Text style={styles.bodyHeader}>
              BLOCK COMMITTEE shall be constituted as follows:
            </Text>
            <Text style={styles.body}>
              (a) President and Secretaries of Primary Committees
              {'\n'}(b) 6 (Six) members from each Primary Committee elected
              during their triennial conferences and sent to the Block Committee
              becomes the member of Block Committee.
              {'\n'}(c) Triennial conference of Block Committee must be
              completed be- fore the triennial conference of the concerned
              District Committee.
            </Text>
            <Text style={styles.bodyHeader}>
              The Block Committees shall be as follows:
            </Text>
            <View style={styles.bodyTableContainer}>
              <Text style={styles.body}>
                (a) President                             1
                {'\n'}(b) Vice President                    3
                {'\n'}(c) General Secretary              1
                {'\n'}(d) Secretaries                          3
                {'\n'}(f) Organising Secretaries      6
                {'\n'}(e) Treasurer                              1
                {'\n'}                                       Total = 15
              </Text>
            </View>
            <Text style={styles.bodyHeader}>PRIMARY COMMITTEE :</Text>
            <Text style={styles.body}>
              a. (i) The Primary Committee on existing VCDC area shall be
              constituted from amongst at least 100 delegates attended in its
              triennial conference.
              {'\n'}(ii) Five members from each village including two woman
              members shall be elected.
              {'\n'}b. Triennial conference of the Primary Committee shall be
              completed before the triennial conference of the Block Committee.
            </Text>
            <Text style={styles.bodyHeader}>
              The Primary Committees shall be constituted with the following
              portfolios:
            </Text>
            <View style={styles.bodyTableContainer}>
              <Text style={styles.body}>
                (a) President                                   1
                {'\n'}(b) Vice President                          3
                {'\n'}(c) General Secretary                     1
                {'\n'}(d) Secretaries                                3
                {'\n'}(f) Organising Secretaries            6
                {'\n'}(e) Treasurer                                    1
                {'\n'}(f) Members from each village    6
                {'\n'}                                             Total = 15
              </Text>
            </View>
            <Text style={styles.bodyHeader}>
              POWER AND FUNCTIONS OF THE DISTRICT, BLOCK AND PRIMARY COMMITTEES:
            </Text>
            <Text style={styles.body}>
              The powers and functions of the office bearers of district, block
              and primary committees shall be as that of the C.W.C. office
              bearers but within their jurisdictions excluding Clauses (d) and
              (e) of Chapter VI.
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.chapter}>Chapter-VII</Text>
            <Text style={styles.header}>FUND</Text>
            <Text style={styles.body}>
              The party shall have party fund for all levels from Primary to
              Central level to run the party.
            </Text>
            <Text style={styles.body}>
              The fund shall be raised by way of membership fee collection and
              donations and the fund shall be kept in a Joint Account operated
              by the General Secretary and the Treasurer.
            </Text>
            <Text style={styles.body}>
              The distribution of shares of collection of membership fee of all
              categories shall be as follows:
            </Text>
            <View style={styles.bodyTableContainer}>
              <Text style={styles.body}>
                (a) Primary Committee    25%
                {'\n'}(b) Block Committee        25%
                {'\n'}(c) District Committee     25%
                {'\n'}(d) Central Committee     25%
                {'\n'}                                Total = 100%
              </Text>
            </View>
            {/* <Text style={styles.bodyHeader}></Text> */}
            {/* <Text style={styles.footer}></Text> */}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.chapter}>Chapter-VIII</Text>
            <Text style={styles.body}>
              Membership shall be drive by Primary and Block Committees subject
              to the approval of the President of the Central Committee with all
              formalities. The process shall be chanelised by the District
              Committee concerned.
            </Text>
            <Text style={styles.header}>
              Membership fee for one term shall be as follows:
            </Text>
            <View style={styles.bodyTableContainer}>
              <Text style={styles.body}>
                (a) Primary Member (General)              Rs. 20.00
                {'\n'}(b) Primary Committee Member           Rs. 101.00
                {'\n'}(c) Block Committee Members             Rs. 151.00
                {'\n'}(d) District Committee Member            Rs. 201.00
                {'\n'}(d) C.W.C. Member                                   Rs. 301.00
                {'\n'}(d) C.W.C. Member                                   Rs. 301.00
                {'\n'}(d) One term active membership fee   Rs. 1001.00
              </Text>
            </View>
            {/* <Text style={styles.bodyHeader}></Text> */}
            {/* <Text style={styles.footer}></Text> */}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.chapter}>Chapter-IX</Text>
            <Text style={styles.bodyHeader}>Requisition Meeting:</Text>
            <Text style={styles.body}>
              A requisition meeting of C.W.C. is permitted after the collection
              of signatures by at least five members of the CWC members to
              discuss any emergency matters of the party when the President and
              the General Secretary of the party fail to convene the same for
              any reason. Signatures of 1/3nd (one-third) C.W.C members shall be
              required to form quorum of such meeting.
            </Text>
            {/* <Text style={styles.header}></Text>
            <Text style={styles.footer}></Text> */}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.chapter}>Chapter-X</Text>
            <Text style={styles.header}>IMPORTANT RULES OF THE PARTY</Text>
            <Text style={styles.body}>
              1. The party shall maintain the principle of holding of one man
              one portfolio in all level of committees of the party.
              {'\n'}2. Committees of all level of the party shall fill up
              vacancies caused either by death, resignation or expulsion in any
              subsequent meeting of respective committees which shall be placed
              by the concerned district committee before the C.W.C meeting for
              taking approval.
              {'\n'}3. Meeting of all level committees shall be convened giving
              10 (Ten) days time to the members of all level committees.
              {'\n'}4. Strict discipline shall be enforced by the C.W.C. on the
              entire members of the party.
              {'\n'}5. Primary Committees, Block Committees and District
              Committees shall recommend the reports to the C.W.C. for any
              disciplinary actions.
              {'\n'}6. Triennial Conferences shall be presided over by the
              President of the respective level Committee.
              {'\n'}7. The General Secretary of the party shall issue necessary
              guidelines and instructions to the lower level of Committees as
              adopted by the C.W.C. as when necessary.
              {'\n'}8. The C.W.C shall decide to enter into electoral and
              political alliances with like-minded parties or organizations when
              it becomes necessary.
              {'\n'}9. Reports of all level committees submitted for taking
              disciplinary action shall be approved by the C.W.C with due
              consideration.
              {'\n'}10. Minimum sittings of C.W.C, D.W.C. Block and Primary
              Committees shall be bi-monthly.
              {'\n'}11. The C.W.C is the supreme authority for all decisions.
              {'\n'}12. The C.W.C shall constitute Disciplinary Committee for
              disciplinary actions when necessary.
            </Text>
            {/* <Text style={styles.footer}></Text> */}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default ConstitutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    marginLeft: 10,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
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
