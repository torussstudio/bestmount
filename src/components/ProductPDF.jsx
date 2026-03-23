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

// /* ── Color tokens ─────────────────────────────────────────── */
// const C = {
//   bg:     "#1a1612",
//   bgDark: "#0e0c0a",
//   cream:  "#eee8cd",
//   amber:  "#f59e0b",
//   dim:    "#7a756a",
//   border: "rgba(255,255,255,0.08)",
//   rowAlt: "rgba(255,255,255,0.03)",
// };

// /* ── StyleSheet ───────────────────────────────────────────── */
// const s = StyleSheet.create({
//   page: {
//     backgroundColor: C.bg,
//     fontFamily: "SKODANext",
//     color: C.cream,
//     paddingBottom: 0,
//   },

//   /* Header */
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
//   logo: { width: 90, height: "auto" },
//   catBadge: {
//     fontSize: 6,
//     fontWeight: 700,
//     color: C.cream,
//     textTransform: "uppercase",
//     letterSpacing: 1.5,
//     borderWidth: 0.5,
//     borderColor: "rgba(255,255,255,0.2)",
//     borderRadius: 99,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "rgba(255,255,255,0.07)",
//   },

//   /* Hero */
//   hero: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 18,
//     paddingHorizontal: 28,
//     paddingVertical: 18,
//     borderBottomWidth: 0.5,
//     borderBottomColor: C.border,
//   },
//   heroImageBox: {
//     width: 90,
//     height: 70,
//     borderRadius: 8,
//     backgroundColor: "rgba(255,255,255,0.04)",
//     borderWidth: 0.5,
//     borderColor: "rgba(255,255,255,0.08)",
//   },
//   heroName: {
//     fontSize: 30,
//     fontWeight: 900,
//     color: C.cream,
//     letterSpacing: -0.5,
//     lineHeight: 1,
//   },
//   heroSub: {
//     fontSize: 6,
//     fontWeight: 700,
//     color: "rgba(238,232,205,0.45)",
//     textTransform: "uppercase",
//     letterSpacing: 2,
//     marginTop: 5,
//   },

//   /* Stats row */
//   statsRow: {
//     flexDirection: "row",
//     paddingHorizontal: 28,
//     paddingVertical: 14,
//     gap: 20,
//     borderBottomWidth: 0.5,
//     borderBottomColor: C.border,
//   },
//   statCol: { flex: 1 },
//   statColWide: { flex: 1.4 },
//   statLabel: {
//     fontSize: 5.5,
//     fontWeight: 700,
//     color: C.amber,
//     textTransform: "uppercase",
//     letterSpacing: 1,
//     marginBottom: 4,
//   },
//   statValue: {
//     fontSize: 16,
//     fontWeight: 700,
//     color: C.cream,
//   },
//   swatchRow: { flexDirection: "row", gap: 5, flexWrap: "wrap", marginTop: 2 },
//   swatch: { width: 24, height: 14, borderRadius: 3, borderWidth: 0.5, borderColor: "rgba(255,255,255,0.15)" },
//   swatchLabel: { fontSize: 4.5, color: "rgba(238,232,205,0.5)", textTransform: "uppercase", textAlign: "center", marginTop: 2 },

//   /* Body */
//   body: {
//     flexDirection: "row",
//     paddingHorizontal: 28,
//     paddingTop: 14,
//     paddingBottom: 0,
//     gap: 20,
//   },
//   bodyLeft:  { flex: 1 },
//   bodyRight: { flex: 1 },

//   sectionLabel: {
//     fontSize: 6,
//     fontWeight: 700,
//     color: C.amber,
//     textTransform: "uppercase",
//     letterSpacing: 1,
//     marginBottom: 6,
//     lineHeight: 1.4,
//   },

//   /* Table */
//   tableHead: {
//     flexDirection: "row",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "rgba(255,255,255,0.12)",
//     paddingBottom: 4,
//     marginBottom: 2,
//   },
//   tableHeadCell: {
//     fontSize: 5,
//     fontWeight: 700,
//     color: "rgba(238,232,205,0.35)",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "rgba(255,255,255,0.05)",
//     paddingVertical: 3.5,
//   },
//   tableCell0: { fontSize: 5.5, fontWeight: 700, color: "rgba(238,232,205,0.9)", flex: 1.6 },
//   tableCell:  { fontSize: 5.5, fontWeight: 400, color: "rgba(238,232,205,0.65)", flex: 1 },

//   /* Right panel */
//   rightSection: { marginBottom: 10 },
//   divider: { borderTopWidth: 0.5, borderTopColor: "rgba(255,255,255,0.1)", marginTop: 4, marginBottom: 5 },
//   bodyText: { fontSize: 6, color: "rgba(238,232,205,0.75)", lineHeight: 1.6 },

//   /* Footer */
//   footer: {
//     backgroundColor: C.bgDark,
//     borderTopWidth: 0.5,
//     borderTopColor: C.border,
//     paddingVertical: 10,
//     paddingHorizontal: 28,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   footerText1: { fontSize: 5.5, color: "rgba(238,232,205,0.35)", textAlign: "center" },
//   footerText2: { fontSize: 4.5, color: "rgba(238,232,205,0.2)", textAlign: "center", marginTop: 3 },
// });

// /* ── PDF Document ─────────────────────────────────────────── */
// export default function ProductPDF({ product }) {
//   const categoryName = product?.category?.name ?? "";

//   return (
//     <Document title={`${product.shortName || product.name} — Technical Data Sheet`}>
//       <Page size="A4" style={s.page}>

//         {/* ── HEADER ── */}
//         <View style={s.header}>
//           <Image src={logoSrc} style={s.logo} />
//           {categoryName ? <Text style={s.catBadge}>{categoryName}</Text> : null}
//         </View>

//         {/* ── HERO ── */}
//         <View style={s.hero}>
//           <View style={s.heroImageBox} />
//           <View>
//             <Text style={s.heroName}>{product.shortName || product.name || "—"}</Text>
//             <Text style={s.heroSub}>Technical Data Sheet</Text>
//           </View>
//         </View>

//         {/* ── STATS ROW ── */}
//         <View style={s.statsRow}>
//           <View style={s.statCol}>
//             <Text style={s.statLabel}>Fused Process</Text>
//             <Text style={s.statValue}>{product.fusedProcess || "—"}</Text>
//           </View>
//           <View style={s.statCol}>
//             <Text style={s.statLabel}>Bulk Density</Text>
//             <Text style={s.statValue}>{product.bulkDensity != null ? String(product.bulkDensity) : "—"}</Text>
//           </View>
//           <View style={s.statColWide}>
//             <Text style={s.statLabel}>Color Tone</Text>
//             {product.colorTones?.length > 0 ? (
//               <View style={s.swatchRow}>
//                 {product.colorTones.slice(0, 6).map((tone, i) => (
//                   <View key={i}>
//                     <View style={[s.swatch, { backgroundColor: tone.color || "#888" }]} />
//                     <Text style={s.swatchLabel}>{(tone.name || "").toUpperCase()}</Text>
//                   </View>
//                 ))}
//               </View>
//             ) : (
//               <Text style={s.statValue}>—</Text>
//             )}
//           </View>
//         </View>

//         {/* ── BODY ── */}
//         <View style={s.body}>
//           {/* Left: Chemical Composition */}
//           <View style={s.bodyLeft}>
//             <Text style={s.sectionLabel}>{"Chemical Composition\n& Physical Analysis"}</Text>
//             {product.chemicalComposition?.length > 0 ? (
//               <View>
//                 <View style={s.tableHead}>
//                   <Text style={[s.tableHeadCell, { flex: 1.6 }]}>Name</Text>
//                   <Text style={[s.tableHeadCell, { flex: 1 }]}>Typical</Text>
//                   <Text style={[s.tableHeadCell, { flex: 1 }]}>Min %</Text>
//                   <Text style={[s.tableHeadCell, { flex: 1 }]}>Max %</Text>
//                 </View>
//                 {product.chemicalComposition.map((row, i) => (
//                   <View key={i} style={s.tableRow}>
//                     <Text style={s.tableCell0}>{row.name || "—"}</Text>
//                     <Text style={s.tableCell}>{row.typical || "—"}</Text>
//                     <Text style={s.tableCell}>{row.min || "—"}</Text>
//                     <Text style={s.tableCell}>{row.max || "—"}</Text>
//                   </View>
//                 ))}
//               </View>
//             ) : (
//               <Text style={s.bodyText}>No composition data available.</Text>
//             )}
//           </View>

//           {/* Right: Remarks / Sizing / Application */}
//           <View style={s.bodyRight}>
//             {[
//               { label: "Remarks",               value: product.remarks },
//               { label: "Sizing",                 value: product.sizing },
//               { label: "Industrial Application", value: product.industrialApplication },
//             ].filter((r) => r.value).map(({ label, value }) => (
//               <View key={label} style={s.rightSection}>
//                 <Text style={s.sectionLabel}>{label.toUpperCase()}</Text>
//                 <View style={s.divider} />
//                 <Text style={s.bodyText}>{value}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* ── FOOTER ── */}
//         <View style={s.footer}>
//           <Text style={s.footerText1}>© Room 1112, 11/F Hollywood Plaza, Nathan road 610 Mongkok, Hong Kong</Text>
//           <Text style={s.footerText2}>COPYRIGHT © 2017-2026 BEST MOUNTAIN LIMITED</Text>
//         </View>

//       </Page>
//     </Document>
//   );
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

import fontRegularUrl  from "../assets/fonts/SKODANext-Regular.woff?url";
import fontBoldUrl     from "../assets/fonts/SKODANext-Bold.woff?url";
import fontBlackUrl    from "../assets/fonts/SKODANext-Black.woff?url";

Font.register({
  family: "SKODANext",
  fonts: [
    { src: fontRegularUrl, fontWeight: 400 },
    { src: fontBoldUrl,    fontWeight: 700 },
    { src: fontBlackUrl,   fontWeight: 900 },
  ],
});

const C = {
  bg:     "#1a1612",
  bgDark: "#0e0c0a",
  cream:  "#eee8cd",
  amber:  "#f59e0b",
  border: "rgba(255,255,255,0.08)",
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

  contentWrapper:{
    flexGrow:1,
    display:"flex",
    flexDirection:"column",
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

  logo:{ width:90 },

  catBadge:{
    fontSize:6,
    fontWeight:700,
    letterSpacing:1.5,
    borderWidth:0.5,
    borderColor:"rgba(255,255,255,0.2)",
    borderRadius:99,
    paddingHorizontal:10,
    paddingVertical:4,
    backgroundColor:"rgba(255,255,255,0.07)",
  },

  hero:{
    flexDirection:"row",
    gap:18,
    paddingHorizontal:28,
    paddingVertical:18,
    borderBottomWidth:0.5,
    borderBottomColor:C.border,
  },

  heroImageBox:{
    width:90,
    height:70,
    borderRadius:8,
    backgroundColor:"rgba(255,255,255,0.04)",
    borderWidth:0.5,
    borderColor:"rgba(255,255,255,0.08)",
  },

  heroName:{
    fontSize:30,
    fontWeight:900,
  },

  heroSub:{
    fontSize:6,
    marginTop:5,
    opacity:0.6,
    letterSpacing:2,
  },

  statsRow:{
    flexDirection:"row",
    paddingHorizontal:28,
    paddingVertical:14,
    gap:20,
    borderBottomWidth:0.5,
    borderBottomColor:C.border,
  },

  statCol:{ flex:1 },
  statColWide:{ flex:1.4 },

  statLabel:{
    fontSize:5.5,
    color:C.amber,
    marginBottom:4,
    letterSpacing:1,
  },

  statValue:{
    fontSize:16,
    fontWeight:700,
  },

  swatchRow:{
    flexDirection:"row",
    gap:5,
    marginTop:2,
  },

  swatch:{
    width:24,
    height:14,
    borderRadius:3,
    borderWidth:0.5,
    borderColor:"rgba(255,255,255,0.15)",
  },

  body:{
    flexDirection:"row",
    paddingHorizontal:28,
    paddingTop:14,
    gap:35,
    flexGrow:1,
  },

  bodyLeft:{ flex:1 },
  bodyRight:{ flex:1 },

  sectionLabel:{
    fontSize:6,
    color:C.amber,
    marginBottom:6,
    letterSpacing:1,
  },

  tableHead:{
    flexDirection:"row",
    borderBottomWidth:0.5,
    borderBottomColor:"rgba(255,255,255,0.12)",
    paddingBottom:4,
    marginBottom:2,
  },

  tableRow:{
    flexDirection:"row",
    borderBottomWidth:0.5,
    borderBottomColor:"rgba(255,255,255,0.05)",
    paddingVertical:3.5,
  },

  tableCell0:{ fontSize:5.5, flex:1.6 },
  tableCell:{ fontSize:5.5, flex:1 },

  rightSection:{ marginBottom:10 },

  divider:{
    borderTopWidth:0.5,
    borderTopColor:"rgba(255,255,255,0.1)",
    marginVertical:4,
  },

  bodyText:{
    fontSize:6,
    lineHeight:1.6,
  },

  footer:{
    backgroundColor:C.bgDark,
    borderTopWidth:0.5,
    borderTopColor:C.border,
    paddingVertical:10,
    paddingHorizontal:28,
    alignItems:"center",
  },

  footerText1:{
    fontSize:5.5,
    opacity:0.5,
  },

  footerText2:{
    fontSize:4.5,
    opacity:0.3,
    marginTop:3,
  },

});


export default function ProductPDF({ product }) {

  const categoryName = product?.category?.name ?? "";

  return (

<Document>

<Page
  size={{ width: 595, height: 780 }}
  style={s.page}
>

<View style={s.contentWrapper}>

<View style={s.header}>
<Image src={logoSrc} style={s.logo}/>
{categoryName && (
<Text style={s.catBadge}>
{categoryName}
</Text>
)}
</View>


<View style={s.hero}>

<View style={s.heroImageBox}/>

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

<Text style={s.statLabel}>
COLOR TONE
</Text>

<View style={s.swatchRow}>

{product.colorTones?.map((tone,i)=>(
<View key={i}>
<View
style={[
s.swatch,
{ backgroundColor:tone.color }
]}
/>
</View>
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

<Text style={s.tableCell0}>
NAME
</Text>

<Text style={s.tableCell}>
TYPICAL
</Text>

<Text style={s.tableCell}>
MIN %
</Text>

<Text style={s.tableCell}>
MAX %
</Text>

</View>


{product.chemicalComposition?.map((row,i)=>(

<View
key={i}
style={s.tableRow}
>

<Text style={s.tableCell0}>
{row.name}
</Text>

<Text style={s.tableCell}>
{row.typical}
</Text>

<Text style={s.tableCell}>
{row.min}
</Text>

<Text style={s.tableCell}>
{row.max}
</Text>

</View>

))}

</View>



<View style={s.bodyRight}>

{[
["REMARKS",product.remarks],
["SIZING",product.sizing],
["INDUSTRIAL APPLICATION",product.industrialApplication],
].map(([title,val])=>

val && (

<View
key={title}
style={s.rightSection}
>

<Text style={s.sectionLabel}>
{title}
</Text>

<View style={s.divider}/>

<Text style={s.bodyText}>
{val}
</Text>

</View>

)

)}

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