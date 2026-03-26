

// import {
//   Document,
//   Page,
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Font,
// } from "@react-pdf/renderer";
// import logoSrc from "../assets/images/bm-logo-tm-w.png";

// import fontRegularUrl  from "../assets/fonts/SKODANext-Regular.woff?url";
// import fontBoldUrl     from "../assets/fonts/SKODANext-Bold.woff?url";
// import fontBlackUrl    from "../assets/fonts/SKODANext-Black.woff?url";

// Font.register({
//   family: "SKODANext",
//   fonts: [
//     { src: fontRegularUrl, fontWeight: 400 },
//     { src: fontBoldUrl,    fontWeight: 700 },
//     { src: fontBlackUrl,   fontWeight: 900 },
//   ],
// });

// const C = {
//   bg:     "#1a1b1e",
//   bgDark: "#131416",
//   cream:  "#eee8cd",
//   amber:  "#fbbf24",
//   border: "#313234",
  
//   // Solid HEX conversions of rgba(255,255,255, X) mapped to #1a1b1e
//   border04: "#232427",
//   border05: "#252626",
//   border07: "#2a2b2e",
//   border08: "#2c2d30",
//   border12: "#353639",
//   border15: "#3c3d40",
//   border20: "#48494b",

//   // Solid HEX conversions of rgba(238,232,205, X) mapped to #1a1b1e
//   text20: "#3f3e3b",
//   text35: "#64635b",
//   text45: "#79776d",
//   text50: "#848175",
//   text65: "#a4a090",
//   text75: "#b9b5a1",
//   text90: "#d9d3bb",
// };

// const s = StyleSheet.create({

//   page: {
//     backgroundColor: C.bg,
//     fontFamily: "SKODANext",
//     color: C.cream,

//     paddingTop: 28,
//     paddingBottom: 28,

//     display: "flex",
//     flexDirection: "column",
//   },

//   contentWrapper:{
//     flexGrow:1,
//     display:"flex",
//     flexDirection:"column",
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 28,
//     paddingTop: 20,
//     paddingBottom: 14,
//     borderBottomWidth: 0.5,
//     borderBottomColor: C.border,
//   },

//   logo:{ width:90 },

//   catBadge:{
//     fontSize:6,
//     fontWeight:700,
//     letterSpacing:1.5,
//     borderWidth:0.5,
//     borderColor: C.border20,
//     borderRadius:99,
//     paddingHorizontal:10,
//     paddingVertical:4,
//     backgroundColor: C.border07,
//   },

//   hero:{
//     flexDirection:"row",
//     gap:18,
//     paddingHorizontal:28,
//     paddingVertical:18,
//     borderBottomWidth:0.5,
//     borderBottomColor:C.border,
//   },

//   heroImageBox:{
//     width:90,
//     height:70,
//     borderRadius:8,
//     backgroundColor: C.border04,
//     borderWidth:0.5,
//     borderColor: C.border08,
//   },

//   heroName:{
//     fontSize:30,
//     fontWeight:900,
//   },

//   heroSub:{
//     fontSize:6,
//     marginTop:5,
//     color: C.text65,
//     letterSpacing:2,
//   },

//   statsRow:{
//     flexDirection:"row",
//     paddingHorizontal:28,
//     paddingVertical:14,
//     gap:20,
//     borderBottomWidth:0.5,
//     borderBottomColor:C.border,
//   },

//   statCol:{ flex:1 },
//   statColWide:{ flex:1.4 },

//   statLabel:{
//     fontSize:5.5,
//     color: C.amber,
//     marginBottom:4,
//     letterSpacing:1,
//   },

//   statValue:{
//     fontSize:16,
//     fontWeight:700,
//   },

//   swatchRow:{
//     flexDirection:"row",
//     gap:5,
//     marginTop:2,
//   },

//   swatch:{
//     width:24,
//     height:14,
//     borderRadius:3,
//     borderWidth:0.5,
//     borderColor: C.border15,
//   },

//   body:{
//     flexDirection:"row",
//     paddingHorizontal:28,
//     paddingTop:14,
//     gap:35,
//     flexGrow:1,
//   },

//   bodyLeft:{ flex:1 },
//   bodyRight:{ flex:1 },

//   sectionLabel:{
//     fontSize:6,
//     color:C.amber,
//     marginBottom:6,
//     letterSpacing:1,
//   },

//   tableHead:{
//     flexDirection:"row",
//     borderBottomWidth:0.5,
//     borderBottomColor: C.border12,
//     paddingBottom:4,
//     marginBottom:2,
//   },

//   tableRow:{
//     flexDirection:"row",
//     borderBottomWidth:0.5,
//     borderBottomColor: C.border05,
//     paddingVertical:3.5,
//   },

//   tableCell0:{ fontSize:5.5, flex:1.6, color: C.text90 },
//   tableCell:{ fontSize:5.5, flex:1, color: C.text65 },

//   rightSection:{ marginBottom:10 },

//   divider:{
//     borderTopWidth:0.5,
//     borderTopColor: C.border,
//     marginVertical:4,
//   },

//   bodyText:{
//     fontSize:6,
//     lineHeight:1.6,
//     color: C.text75,
//   },

//   footer:{
//     backgroundColor:C.bgDark,
//     borderTopWidth:0.5,
//     borderTopColor:C.border,
//     paddingVertical:10,
//     paddingHorizontal:28,
//     alignItems:"center",
//   },

//   footerText1:{
//     fontSize:5.5,
//     color: C.text50,
//   },

//   footerText2:{
//     fontSize:4.5,
//     color: C.text20,
//     marginTop:3,
//   },

// });


// export default function ProductPDF({ product }) {

//   const categoryName = product?.category?.name ?? "";
// const imageUrl = product?.image
//     ? `http://localhost:5000/uploads/${product.image}`
//     : null;
//   return (

// <Document>

// <Page
//   size={{ width: 595, height: 780 }}
//   style={s.page}
// >

// <View style={s.contentWrapper}>

// <View style={s.header}>
// <Image src={logoSrc} style={s.logo}/>
// {categoryName && (
// <Text style={s.catBadge}>
// {categoryName}
// </Text>
// )}
// </View>


// <View style={s.hero}>

// {imageUrl ? (

// <Image
//   src={imageUrl}
//   style={s.heroImageBox}
// />

// ) : (

// <View style={s.heroImageBox}/>

// )}

// <View>
// <Text style={s.heroName}>
// {product.shortName || product.name}
// </Text>

// <Text style={s.heroSub}>
// TECHNICAL DATA SHEET
// </Text>

// </View>

// </View>


// <View style={s.statsRow}>

// <View style={s.statCol}>
// <Text style={s.statLabel}>FUSED PROCESS</Text>
// <Text style={s.statValue}>
// {product.fusedProcess || "—"}
// </Text>
// </View>


// <View style={s.statCol}>
// <Text style={s.statLabel}>BULK DENSITY</Text>
// <Text style={s.statValue}>
// {product.bulkDensity ?? "—"}
// </Text>
// </View>


// <View style={s.statColWide}>

// <Text style={s.statLabel}>
// COLOR TONE
// </Text>

// <View style={s.swatchRow}>

// {product.colorTones?.map((tone,i)=>(
// <View key={i}>
// <View
// style={[
// s.swatch,
// { backgroundColor:tone.color }
// ]}
// />
// </View>
// ))}

// </View>

// </View>

// </View>



// <View style={s.body}>

// <View style={s.bodyLeft}>

// <Text style={s.sectionLabel}>
// CHEMICAL COMPOSITION & PHYSICAL ANALYSIS
// </Text>


// <View style={s.tableHead}>

// <Text style={s.tableCell0}>
// NAME
// </Text>

// <Text style={s.tableCell}>
// TYPICAL
// </Text>

// <Text style={s.tableCell}>
// MIN %
// </Text>

// <Text style={s.tableCell}>
// MAX %
// </Text>

// </View>


// {product.chemicalComposition?.map((row,i)=>(

// <View
// key={i}
// style={s.tableRow}
// >

// <Text style={s.tableCell0}>
// {row.name}
// </Text>

// <Text style={s.tableCell}>
// {row.typical}
// </Text>

// <Text style={s.tableCell}>
// {row.min}
// </Text>

// <Text style={s.tableCell}>
// {row.max}
// </Text>

// </View>

// ))}

// </View>



// <View style={s.bodyRight}>

// {[
// ["REMARKS",product.remarks],
// ["SIZING",product.sizing],
// ["INDUSTRIAL APPLICATION",product.industrialApplication],
// ].map(([title,val])=>

// val && (

// <View
// key={title}
// style={s.rightSection}
// >

// <Text style={s.sectionLabel}>
// {title}
// </Text>

// <View style={s.divider}/>

// <Text style={s.bodyText}>
// {val}
// </Text>

// </View>

// )

// )}

// </View>


// </View>

// </View>



// <View style={s.footer}>

// <Text style={s.footerText1}>
// © Room 1112, 11/F Hollywood Plaza, Nathan road 610 Mongkok, Hong Kong
// </Text>

// <Text style={s.footerText2}>
// COPYRIGHT © 2017-2026 BEST MOUNTAIN LIMITED
// </Text>

// </View>


// </Page>

// </Document>

// );

// }

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import logoSrc from "../assets/images/bm-logo-tm-w.png";

import fontRegularUrl from "../assets/fonts/SKODANext-Regular.woff?url";
import fontBoldUrl from "../assets/fonts/SKODANext-Bold.woff?url";
import fontBlackUrl from "../assets/fonts/SKODANext-Black.woff?url";

Font.register({
  family: "SKODANext",
  fonts: [
    { src: fontRegularUrl, fontWeight: 400 },
    { src: fontBoldUrl, fontWeight: 700 },
    { src: fontBlackUrl, fontWeight: 900 },
  ],
});

const C = {
  bg: "#1a1b1e",
  bgDark: "#131416",
  cream: "#eee8cd",
  amber: "#fbbf24",
  border: "#313234",

  border04: "#232427",
  border05: "#252626",
  border07: "#2a2b2e",
  border08: "#2c2d30",
  border12: "#353639",
  border15: "#3c3d40",
  border20: "#48494b",

  text20: "#3f3e3b",
  text35: "#64635b",
  text45: "#79776d",
  text50: "#848175",
  text65: "#a4a090",
  text75: "#b9b5a1",
  text90: "#d9d3bb",
};

const s = StyleSheet.create({

  page: {
    backgroundColor: C.bg,
    fontFamily: "SKODANext",
    color: C.cream,
    paddingTop: 28,
    paddingBottom: 28,
    display: "flex",
    flexDirection: "column",
  },

  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },

  logo: { width: 90 },

  catBadge: {
    fontSize: 6,
    fontWeight: 700,
    letterSpacing: 1.5,
    borderWidth: 0.5,
    borderColor: C.border20,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: C.border07,
  },

  hero: {
    flexDirection: "row",
    gap: 18,
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    alignItems: "center",
  },

  heroImageBox: {
    width: 95,
    height: 75,
    borderRadius: 8,
    backgroundColor: C.border04,
    borderWidth: 0.5,
    borderColor: C.border08,
    objectFit: "contain",
  },

  heroName: {
    fontSize: 30,
    fontWeight: 900,
  },

  heroSub: {
    fontSize: 6,
    marginTop: 5,
    color: C.text65,
    letterSpacing: 2,
  },

  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 14,
    gap: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },

  statCol: { flex: 1 },
  statColWide: { flex: 1.4 },

  statLabel: {
    fontSize: 5.5,
    color: C.amber,
    marginBottom: 4,
    letterSpacing: 1,
  },

  statValue: {
    fontSize: 16,
    fontWeight: 700,
  },

  swatchRow: {
    flexDirection: "row",
    gap: 5,
    marginTop: 2,
  },

  swatch: {
    width: 24,
    height: 14,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: C.border15,
  },

  body: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingTop: 14,
    gap: 35,
    flexGrow: 1,
  },

  bodyLeft: { flex: 1 },
  bodyRight: { flex: 1 },

  sectionLabel: {
    fontSize: 6,
    color: C.amber,
    marginBottom: 6,
    letterSpacing: 1,
  },

  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: C.border12,
    paddingBottom: 4,
    marginBottom: 2,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: C.border05,
    paddingVertical: 3.5,
  },

  tableCell0: { fontSize: 5.5, flex: 1.6, color: C.text90 },
  tableCell: { fontSize: 5.5, flex: 1, color: C.text65 },

  rightSection: { marginBottom: 10 },

  divider: {
    borderTopWidth: 0.5,
    borderTopColor: C.border,
    marginVertical: 4,
  },

  bodyText: {
    fontSize: 6,
    lineHeight: 1.6,
    color: C.text75,
  },

  footer: {
    backgroundColor: C.bgDark,
    borderTopWidth: 0.5,
    borderTopColor: C.border,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: "center",
  },

  footerText1: {
    fontSize: 5.5,
    color: C.text50,
  },

  footerText2: {
    fontSize: 4.5,
    color: C.text20,
    marginTop: 3,
  },

});

export default function ProductPDF({ product }) {

  const categoryName = product?.category?.name ?? "";

  const BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

const imageUrl = product?.image
  ? `${BASE_URL}/uploads/${product.image}`
  : null;
  return (

<Document>

<Page
  size={{ width: 595, height: 780 }}
  style={s.page}
>

<View style={s.contentWrapper}>

<View style={s.header}>

<Image src={logoSrc} style={s.logo} />

{categoryName && (
<Text style={s.catBadge}>
{categoryName}
</Text>
)}

</View>


<View style={s.hero}>

{imageUrl ? (

<Image
src={imageUrl}
style={s.heroImageBox}
/>

) : (

<View style={s.heroImageBox} />

)}

<View>

<Text style={s.heroName}>
{product.shortName || product.name}
</Text>

<Text style={s.heroSub}>
TECHNICAL DATA SHEET
</Text>

</View>

</View>


<View style={s.statsRow}>

<View style={s.statCol}>
<Text style={s.statLabel}>FUSED PROCESS</Text>
<Text style={s.statValue}>
{product.fusedProcess || "—"}
</Text>
</View>


<View style={s.statCol}>
<Text style={s.statLabel}>BULK DENSITY</Text>
<Text style={s.statValue}>
{product.bulkDensity ?? "—"}
</Text>
</View>


<View style={s.statColWide}>

<Text style={s.statLabel}>COLOR TONE</Text>

<View style={s.swatchRow}>

{product.colorTones?.map((tone, i) => (

<View
key={i}
style={[
s.swatch,
{ backgroundColor: tone.color }
]}
/>

))}

</View>

</View>

</View>



<View style={s.body}>

<View style={s.bodyLeft}>

<Text style={s.sectionLabel}>
CHEMICAL COMPOSITION & PHYSICAL ANALYSIS
</Text>


<View style={s.tableHead}>

<Text style={s.tableCell0}>NAME</Text>
<Text style={s.tableCell}>TYPICAL</Text>
<Text style={s.tableCell}>MIN %</Text>
<Text style={s.tableCell}>MAX %</Text>

</View>


{product.chemicalComposition?.map((row, i) => (

<View key={i} style={s.tableRow}>

<Text style={s.tableCell0}>{row.name}</Text>
<Text style={s.tableCell}>{row.typical}</Text>
<Text style={s.tableCell}>{row.min}</Text>
<Text style={s.tableCell}>{row.max}</Text>

</View>

))}

</View>



<View style={s.bodyRight}>

{[
["REMARKS", product.remarks],
["SIZING", product.sizing],
["INDUSTRIAL APPLICATION", product.industrialApplication],
].map(([title, val]) => (

val && (

<View key={title} style={s.rightSection}>

<Text style={s.sectionLabel}>
{title}
</Text>

<View style={s.divider} />

<Text style={s.bodyText}>
{val}
</Text>

</View>

)

))}

</View>


</View>

</View>



<View style={s.footer}>

<Text style={s.footerText1}>
© Room 1112, 11/F Hollywood Plaza, Nathan road 610 Mongkok, Hong Kong
</Text>

<Text style={s.footerText2}>
COPYRIGHT © 2017-2026 BEST MOUNTAIN LIMITED
</Text>

</View>


</Page>

</Document>

);

}