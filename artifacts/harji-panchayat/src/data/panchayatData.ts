import type { PanchayatWork } from '@workspace/api-client-react';

export type Language = 'en' | 'hi';

export interface LocalizedWorkContent {
  title: string;
  category: string;
  location: string;
  description: string;
}

export const WORKS_I18N: Record<number, Record<Language, LocalizedWorkContent>> = {
  1: {
    hi: {
      title: 'हरजी मुख्य बाजार एवं सिरोही रोड चौराहा सी.सी. सड़क',
      category: 'सड़क एवं अधोसंरचना',
      location: 'मुख्य बाजार व सिरोही रोड चौराहा, हरजी',
      description: 'राजाराम एग्रो व गुरु कृपा गैरेज से मुख्य बाजार एवं सिरोही रोड तिराहे तक सी.सी. सड़क व व्यापारिक मार्ग सुदृढ़ीकरण।',
    },
    en: {
      title: 'Harji Main Bazaar & Sirohi Road Junction CC Road',
      category: 'Roads & Infrastructure',
      location: 'Main Bazaar & Sirohi Road Junction, Harji',
      description: 'All-weather concrete road and drainage upgradation connecting Sirohi Road chowk, local commerce, agro agencies, and pharmacy junction.',
    },
  },
  2: {
    hi: {
      title: 'हरजी बस स्टैंड व अन्नपूर्णा रसोई पहुंच मार्ग',
      category: 'सड़क एवं अधोसंरचना',
      location: 'बस स्टैंड, हरजी',
      description: 'हरजी बस स्टैंड डिपो, श्री अन्नपूर्णा रसोई योजना (ग्रामीण) परिसर व जीप-टैक्सी स्टैंड तक पक्का मार्ग एवं यात्री सुविधा विकास।',
    },
    en: {
      title: 'Harji Bus Terminal & Annapurna Rasoi Campus Access Way',
      category: 'Roads & Infrastructure',
      location: 'Bus Stand, Harji',
      description: 'Paved access road, passenger transit facilities, and surrounding drainage for Harji Bus Stand, subsidized Annapurna Rasoi, and taxi depot.',
    },
  },
  3: {
    hi: {
      title: 'सोलर स्ट्रीट लाइट योजना',
      category: 'विद्युतीकरण',
      location: 'वार्ड 1 से वार्ड 7',
      description: 'गांव के मुख्य मार्गों, चौराहों और सार्वजनिक स्थलों पर 50 ऊर्जा-कुशल एलईडी सोलर लाइटों की स्थापना।',
    },
    en: {
      title: 'Solar Street Lighting Scheme',
      category: 'Electrification',
      location: 'Ward 1 to Ward 7',
      description: 'Installation of 50 energy-efficient LED solar street lights along key village pathways and community junctions.',
    },
  },
  4: {
    hi: {
      title: 'प्राथमिक स्वास्थ्य उप-केंद्र स्वच्छता एवं जीर्णोद्धार',
      category: 'स्वास्थ्य एवं स्वच्छता',
      location: 'पीएचसी परिसर, हरजी',
      description: 'स्वास्थ्य उप-केंद्र भवन की मरम्मत, शुद्ध पेयजल कनेक्शन, मरीज प्रतीक्षा शेड व चारदीवारी निर्माण।',
    },
    en: {
      title: 'Primary Health Sub-Centre Sanitation & Repairs',
      category: 'Health & Sanitation',
      location: 'PHC Compound, Harji',
      description: 'Renovation of public health sub-centre facilities, clean water connection, patient waiting shed, and boundary wall.',
    },
  },
  5: {
    hi: {
      title: 'हरजी ग्राम तालाब गहरीकरण एवं वर्षा जल संचयन',
      category: 'जल संरक्षण',
      location: 'हरजी ग्राम तालाब',
      description: 'भूजल स्तर बढ़ाने हेतु ग्राम तालाब की गाद निकासी, गहरीकरण तथा पत्थर पिचिंग कार्य।',
    },
    en: {
      title: 'Harji Village Pond Desilting & Rainwater Harvesting',
      category: 'Water Conservation',
      location: 'Harji Village Talab',
      description: 'Deepening and desilting of the village pond with embankment stone pitching to enhance groundwater recharge.',
    },
  },
  6: {
    hi: {
      title: 'भारत निर्माण राजीव गांधी सेवा केंद्र (पंचायत भवन) सुदृढ़ीकरण',
      category: 'सार्वजनिक भवन',
      location: 'पंचायत भवन परिसर, हरजी पं.स. आहोर',
      description: 'ग्राम पंचायत हरजी के भारत निर्माण राजीव गांधी सेवा केंद्र, ई-मित्र डिजिटल कियोस्क, जनसुनवाई सभागार एवं स्वच्छ भारत मिशन परिसर का सुदृढ़ीकरण।',
    },
    en: {
      title: 'Bharat Nirman Rajiv Gandhi Seva Kendra (Panchayat Bhawan) Upgradation',
      category: 'Public Buildings',
      location: 'Panchayat Bhawan Campus, Harji, Ahor',
      description: 'Strengthening of Rajiv Gandhi Seva Kendra administrative hall, e-Mitra digital citizen center, public hearing facility, and Swachh Bharat Mission rural hub.',
    },
  },
  7: {
    hi: {
      title: 'ठोस एवं तरल कचरा पृथक्करण शेड',
      category: 'स्वास्थ्य एवं स्वच्छता',
      location: 'गांव के बाहरी क्षेत्र',
      description: 'स्वच्छ भारत मिशन (ग्रामीण) के अंतर्गत कचरा पृथक्करण शेड एवं खाद गड्ढों का निर्माण।',
    },
    en: {
      title: 'Solid & Liquid Waste Segregation Shed',
      category: 'Health & Sanitation',
      location: 'Village Outskirts',
      description: 'Swachh Bharat Mission (Grameen) phase-2 waste sorting shed and compost pit construction.',
    },
  },
  8: {
    hi: {
      title: 'शाह हीराचन्द खिमराजजी रा.उ.मा. विद्यालय परिसर एवं खेल मैदान विकास',
      category: 'शिक्षा एवं खेल',
      location: 'विद्यालय परिसर, हरजी (जालोर)',
      description: 'शाह हीराचन्द खिमराजजी राजकीय उच्च माध्यमिक विद्यालय के मुख्य प्रवेश द्वार (आर्च गेट), सुरक्षित चारदीवारी, सर्व शिक्षा अभियान परिसर एवं खेल मैदान का सुदृढ़ीकरण।',
    },
    en: {
      title: 'Shah Heerachand Khimrajji Govt Sr Sec School & Playground Upgradation',
      category: 'Education & Sports',
      location: 'Govt School Campus, Harji (Jalore)',
      description: 'Renovation of the memorial entrance arch gate, campus boundary wall, sports ground, and Sarva Shiksha Abhiyan school facilities.',
    },
  },
};

export function localizeWork(work: PanchayatWork, lang: Language): PanchayatWork {
  if (WORKS_I18N[work.id]) {
    const loc = WORKS_I18N[work.id][lang];
    return {
      ...work,
      title: loc.title,
      category: loc.category,
      location: loc.location,
      description: loc.description,
    };
  }

  const titleLower = (work.title || '').toLowerCase();
  for (const [idStr, entry] of Object.entries(WORKS_I18N)) {
    const id = Number(idStr);
    if (
      (id === 1 && (titleLower.includes('drinking water') || titleLower.includes('पेयजल') || titleLower.includes('pipeline'))) ||
      (id === 2 && (titleLower.includes('cement concrete') || titleLower.includes('cc road') || titleLower.includes('नाली') || titleLower.includes('drainage'))) ||
      (id === 3 && (titleLower.includes('solar') || titleLower.includes('सोलर') || titleLower.includes('lighting'))) ||
      (id === 4 && (titleLower.includes('health') || titleLower.includes('स्वास्थ्य') || titleLower.includes('phc'))) ||
      (id === 5 && (titleLower.includes('pond') || titleLower.includes('तालाब') || titleLower.includes('sarovar') || titleLower.includes('desilting'))) ||
      (id === 6 && (titleLower.includes('seva kendra') || titleLower.includes('भवन') || titleLower.includes('bhawan') || titleLower.includes('community hall'))) ||
      (id === 7 && (titleLower.includes('waste') || titleLower.includes('कचरा') || titleLower.includes('slwm') || titleLower.includes('segregation'))) ||
      (id === 8 && (titleLower.includes('school') || titleLower.includes('playground') || titleLower.includes('विद्यालय') || titleLower.includes('मैदान')))
    ) {
      return {
        ...work,
        title: entry[lang].title,
        category: entry[lang].category,
        location: entry[lang].location,
        description: entry[lang].description,
      };
    }
  }

  return work;
}

export const DEMO_WORKS: Record<Language, PanchayatWork[]> = {
  hi: [
    {
      id: 1,
      title: 'हरजी मुख्य बाजार एवं सिरोही रोड चौराहा सी.सी. सड़क',
      category: 'सड़क एवं अधोसंरचना',
      location: 'मुख्य बाजार व सिरोही रोड चौराहा, हरजी',
      description: 'राजाराम एग्रो व गुरु कृपा गैरेज से मुख्य बाजार एवं सिरोही रोड तिराहे तक सी.सी. सड़क व व्यापारिक मार्ग सुदृढ़ीकरण।',
      sanctionedAmount: 450000,
      progress: 65,
      status: 'ongoing',
      startDate: '2025-11-15',
      targetDate: '2026-04-30',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 2,
      title: 'सी.सी. सड़क एवं कवर्ड नाली निर्माण कार्य',
      category: 'सड़क एवं अधोसंरचना',
      location: 'बस स्टैंड, हरजी',
      description: '1.2 किमी बारहमासी सीमेंट कंक्रीट सड़क तथा वर्षा जल व गंदे पानी की निकासी हेतु पक्की कवर्ड नाली निर्माण।',
      sanctionedAmount: 820000,
      progress: 100,
      status: 'completed',
      startDate: '2025-05-10',
      targetDate: '2025-10-25',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 3,
      title: 'सोलर स्ट्रीट लाइट योजना',
      category: 'विद्युतीकरण',
      location: 'वार्ड 1 से वार्ड 7',
      description: 'गांव के मुख्य मार्गों, चौराहों और सार्वजनिक स्थलों पर 50 ऊर्जा-कुशल एलईडी सोलर लाइटों की स्थापना।',
      sanctionedAmount: 350000,
      progress: 100,
      status: 'completed',
      startDate: '2025-08-01',
      targetDate: '2025-11-20',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 4,
      title: 'प्राथमिक स्वास्थ्य उप-केंद्र स्वच्छता एवं जीर्णोद्धार',
      category: 'स्वास्थ्य एवं स्वच्छता',
      location: 'पीएचसी परिसर, हरजी',
      description: 'स्वास्थ्य उप-केंद्र भवन की मरम्मत, शुद्ध पेयजल कनेक्शन, मरीज प्रतीक्षा शेड व चारदीवारी निर्माण।',
      sanctionedAmount: 280000,
      progress: 80,
      status: 'ongoing',
      startDate: '2025-12-01',
      targetDate: '2026-03-31',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 5,
      title: 'हरजी ग्राम तालाब गहरीकरण एवं वर्षा जल संचयन',
      category: 'जल संरक्षण',
      location: 'हरजी ग्राम तालाब',
      description: 'भूजल स्तर बढ़ाने हेतु ग्राम तालाब की गाद निकासी, गहरीकरण तथा पत्थर पिचिंग कार्य।',
      sanctionedAmount: 510000,
      progress: 100,
      status: 'completed',
      startDate: '2025-04-01',
      targetDate: '2025-07-15',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 6,
      title: 'भारत निर्माण राजीव गांधी सेवा केंद्र (पंचायत भवन) सुदृढ़ीकरण',
      category: 'सार्वजनिक भवन',
      location: 'पंचायत भवन परिसर, हरजी पं.स. आहोर',
      description: 'ग्राम पंचायत हरजी के भारत निर्माण राजीव गांधी सेवा केंद्र, ई-मित्र डिजिटल कियोस्क, जनसुनवाई सभागार एवं स्वच्छ भारत मिशन परिसर का सुदृढ़ीकरण।',
      sanctionedAmount: 1200000,
      progress: 45,
      status: 'ongoing',
      startDate: '2026-01-10',
      targetDate: '2026-08-30',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 7,
      title: 'ठोस एवं तरल कचरा पृथक्करण शेड',
      category: 'स्वास्थ्य एवं स्वच्छता',
      location: 'गांव के बाहरी क्षेत्र',
      description: 'स्वच्छ भारत मिशन (ग्रामीण) के अंतर्गत कचरा पृथक्करण शेड एवं खाद गड्ढों का निर्माण।',
      sanctionedAmount: 390000,
      progress: 15,
      status: 'planned',
      startDate: '2026-04-01',
      targetDate: '2026-10-31',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 8,
      title: 'शाह हीराचन्द खिमराजजी रा.उ.मा. विद्यालय परिसर एवं खेल मैदान विकास',
      category: 'शिक्षा एवं खेल',
      location: 'विद्यालय परिसर, हरजी (जालोर)',
      description: 'शाह हीराचन्द खिमराजजी राजकीय उच्च माध्यमिक विद्यालय के मुख्य प्रवेश द्वार (आर्च गेट), सुरक्षित चारदीवारी, सर्व शिक्षा अभियान परिसर एवं खेल मैदान का सुदृढ़ीकरण।',
      sanctionedAmount: 400000,
      progress: 100,
      status: 'completed',
      startDate: '2025-06-01',
      targetDate: '2025-09-30',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Harji Main Bazaar & Sirohi Road Junction CC Road',
      category: 'Roads & Infrastructure',
      location: 'Main Bazaar & Sirohi Road Junction, Harji',
      description: 'All-weather concrete road and drainage upgradation connecting Sirohi Road chowk, local commerce, agro agencies, and pharmacy junction.',
      sanctionedAmount: 450000,
      progress: 65,
      status: 'ongoing',
      startDate: '2025-11-15',
      targetDate: '2026-04-30',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 2,
      title: 'Harji Bus Terminal & Annapurna Rasoi Campus Access Way',
      category: 'Roads & Infrastructure',
      location: 'Bus Stand, Harji',
      description: 'Paved access road, passenger transit facilities, and surrounding drainage for Harji Bus Stand, subsidized Annapurna Rasoi, and taxi depot.',
      sanctionedAmount: 820000,
      progress: 100,
      status: 'completed',
      startDate: '2025-05-10',
      targetDate: '2025-10-25',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 3,
      title: 'Solar Street Lighting Scheme',
      category: 'Electrification',
      location: 'Ward 1 to Ward 7',
      description: 'Installation of 50 energy-efficient LED solar street lights along key village pathways and community junctions.',
      sanctionedAmount: 350000,
      progress: 100,
      status: 'completed',
      startDate: '2025-08-01',
      targetDate: '2025-11-20',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 4,
      title: 'Primary Health Sub-Centre Sanitation & Repairs',
      category: 'Health & Sanitation',
      location: 'PHC Compound, Harji',
      description: 'Renovation of public health sub-centre facilities, clean water connection, patient waiting shed, and boundary wall.',
      sanctionedAmount: 280000,
      progress: 80,
      status: 'ongoing',
      startDate: '2025-12-01',
      targetDate: '2026-03-31',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 5,
      title: 'Harji Village Pond Desilting & Rainwater Harvesting',
      category: 'Water Conservation',
      location: 'Harji Village Talab',
      description: 'Deepening and desilting of the village pond with embankment stone pitching to enhance groundwater recharge.',
      sanctionedAmount: 510000,
      progress: 100,
      status: 'completed',
      startDate: '2025-04-01',
      targetDate: '2025-07-15',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 6,
      title: 'Bharat Nirman Rajiv Gandhi Seva Kendra (Panchayat Bhawan) Upgradation',
      category: 'Public Buildings',
      location: 'Panchayat Bhawan Campus, Harji, Ahor',
      description: 'Strengthening of Rajiv Gandhi Seva Kendra administrative hall, e-Mitra digital citizen center, public hearing facility, and Swachh Bharat Mission rural hub.',
      sanctionedAmount: 1200000,
      progress: 45,
      status: 'ongoing',
      startDate: '2026-01-10',
      targetDate: '2026-08-30',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 7,
      title: 'Solid & Liquid Waste Segregation Shed',
      category: 'Health & Sanitation',
      location: 'Village Outskirts',
      description: 'Swachh Bharat Mission (Grameen) phase-2 waste sorting shed and compost pit construction.',
      sanctionedAmount: 390000,
      progress: 15,
      status: 'planned',
      startDate: '2026-04-01',
      targetDate: '2026-10-31',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
    {
      id: 8,
      title: 'Shah Heerachand Khimrajji Govt Sr Sec School & Playground Upgradation',
      category: 'Education & Sports',
      location: 'Govt School Campus, Harji (Jalore)',
      description: 'Renovation of the memorial entrance arch gate, campus boundary wall, sports ground, and Sarva Shiksha Abhiyan school facilities.',
      sanctionedAmount: 400000,
      progress: 100,
      status: 'completed',
      startDate: '2025-06-01',
      targetDate: '2025-09-30',
      updatedAt: '2026-10-10T00:00:00.000Z',
    },
  ],
};

export interface DemoComplaint {
  id: string;
  category: string;
  title: string;
  area: string;
  date: string;
  status: 'resolved' | 'ongoing' | 'review';
}

export const DEMO_COMPLAINTS: Record<Language, DemoComplaint[]> = {
  hi: [
    {
      id: 'HGP-GRV-26-W3091',
      category: 'पेयजल',
      title: 'वार्ड 3 मुख्य चौक पर पेयजल पाइपलाइन रिसाव की शिकायत',
      area: 'वार्ड 3, मुख्य चौक, हरजी',
      date: '10 अक्टूबर 2026',
      status: 'resolved',
    },
    {
      id: 'HGP-GRV-26-E4812',
      category: 'बिजली',
      title: 'बस स्टैंड तिराहे पर 2 सोलर स्ट्रीट लाइट बंद होने की सूचना',
      area: 'बस स्टैंड तिराहा',
      date: '08 अक्टूबर 2026',
      status: 'ongoing',
    },
    {
      id: 'HGP-GRV-26-S1954',
      category: 'सफाई',
      title: 'स्टेशन रोड पर कवर्ड नाली की सफाई एवं गाद निकासी',
      area: 'स्टेशन रोड, वार्ड 2',
      date: '05 अक्टूबर 2026',
      status: 'resolved',
    },
    {
      id: 'HGP-GRV-26-R8831',
      category: 'सड़क',
      title: 'वार्ड 5 की भीतरी गली में वर्षा जल भराव व सड़क मरम्मत',
      area: 'वार्ड 5, हरजी',
      date: '02 अक्टूबर 2026',
      status: 'ongoing',
    },
  ],
  en: [
    {
      id: 'HGP-GRV-26-W3091',
      category: 'Water',
      title: 'Potable water pipeline leakage at Ward 3 main square',
      area: 'Ward 3, Main Square, Harji',
      date: '10 Oct 2026',
      status: 'resolved',
    },
    {
      id: 'HGP-GRV-26-E4812',
      category: 'Electricity',
      title: '2 Solar street lights non-functional at Bus Stand junction',
      area: 'Bus Stand Junction',
      date: '08 Oct 2026',
      status: 'ongoing',
    },
    {
      id: 'HGP-GRV-26-S1954',
      category: 'Sanitation',
      title: 'Covered drainage desilting and lane cleaning on Station Road',
      area: 'Station Road, Ward 2',
      date: '05 Oct 2026',
      status: 'resolved',
    },
    {
      id: 'HGP-GRV-26-R8831',
      category: 'Roads',
      title: 'Lane waterlogging and surface repair in Ward 5',
      area: 'Ward 5, Harji',
      date: '02 Oct 2026',
      status: 'ongoing',
    },
  ],
};
