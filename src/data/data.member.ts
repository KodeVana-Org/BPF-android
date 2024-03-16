export type Category = {
  title: string;
  content: string[];
  contentNested: NestedItem[];
  type: string;
};

export type NestedItem = {
  title: string;
  content: string[];
};

export type Data = Category[];

const data: Data = [
  {
    title: 'BPF Parent Body',
    content: [],
    contentNested: [
      {
        title: 'Hagrama Mohilary, President',
        content: [
          "President of BPF and Former Chief of BTC. Hagrama Mohilary (born 1 March 1969) is an Indian politician who has served as the first Chief Executive Member of the Bodoland Territorial Council from 2005 to 2020, representing the Deborgaon constituency. He is the chairperson of the Bodoland People's Front and had been the head of Bodoland Territorial Council since its inception in 2003. He won the third General Assembly Elections 2015 and formed his Government for the third time. Mohilary was the chief of the Bodo Liberation Tigers (BLT) before joining the mainstream politics in 2003.",
        ],
      },
      {
        title: 'Maneswar Brahma, Secretary',
        content: [
          "Maneswar Brahma is the secretary of Bodoland People's Front political party from Assam. He has been elected in Assam Legislative Assembly election in 2016 from Barama constituency",
        ],
      },
    ],
    type: 'nested',
  },
  {
    title: 'Kokrajhar',
    content: ['Members will be updated soon!'],
    contentNested: [],
    type: 'regular',
  },
  {
    title: 'Chirang',
    content: ['Members will be updated soon!'],
    contentNested: [],
    type: 'regular',
  },
  {
    title: 'Baksa',
    content: ['Members will be updated soon!'],
    contentNested: [],
    type: 'regular',
  },
  {
    title: 'Tamulpur',
    content: ['Members will be updated soon!'],
    contentNested: [],
    type: 'regular',
  },
  {
    title: 'Udalguri',
    content: ['Members will be updated soon!'],
    contentNested: [],
    type: 'regular',
  },
];

export default data;
