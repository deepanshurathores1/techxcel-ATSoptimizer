// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [templates, setTemplates] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetch("/data/templates.json")
//       .then((res) => res.json())
//       .then((data) => setTemplates(data));
//   }, []);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
//       {templates.map((template) => (
//         <div key={template.id} className="border p-4 rounded-lg shadow-lg">
//           <img src={template.thumbnail} alt={template.name} className="w-full h-40 object-cover rounded-md" />
//           <h3 className="text-lg font-bold mt-2">{template.name}</h3>
//           <button
//             onClick={() => router.push(`/form?template=${template.file}`)}
//             className="bg-blue-500 text-white px-4 py-2 mt-2 inline-block rounded"
//           >
//             Select Template
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
