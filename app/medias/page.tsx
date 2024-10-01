// import {
//   Box,
//   Flex,
//   Image,
//   Icon,
//   Text,
//   Link,
//   useClipboard,
//   useToast,
// } from "@chakra-ui/react";
// import { MdContentCopy } from "react-icons/md";
// import { useState } from "react";
// import { Medias } from "../components/admin/Medias";
// import LayoutEditer from "../components/admin/LayoutEditer";
// import { LayoutDefault } from "../components/admin/LayoutDefault";

// export default function MediasPage() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const { onCopy } = useClipboard(selectedImage || "");
//   const toast = useToast();

//   const handleCopy = () => {
//     onCopy();
//     toast({
//       title: "Đã copy",
//       colorScheme: "teal",
//       duration: 3000,
//       position: "top",
//       isClosable: true,
//     });
//   };

//   return (
//     <LayoutDefault>
//       <Flex direction="row" w="100%">
//         <Box flex="1">
//           <LayoutEditer w={"1000px"}>
//             <Box px={"20px"}>
//               <Medias onImageSelect={setSelectedImage} />
//             </Box>
//           </LayoutEditer>
//         </Box>
//         {selectedImage && (
//           <Box flex="1" mt={4} ml={4} bg={"white"} px={"10px"}>
//             <Image
//               src={selectedImage}
//               alt="Selected"
//               borderRadius={"10px"}
//               mt={2}
//               w={"300px"}
//               height={"400px"}
//               objectFit={"contain"}
//               cursor="pointer"
//               onClick={handleCopy}
//             />
//             <Flex align="center" mt={2}>
//               <Text flex="1">
//                 <Link href={selectedImage} isExternal>
//                   {selectedImage}
//                 </Link>
//               </Text>
//               <Icon
//                 as={MdContentCopy}
//                 boxSize={6}
//                 cursor="pointer"
//                 onClick={handleCopy}
//                 ml={4}
//                 color="#2c7a7b"
//                 _hover={{ color: "#2c7a7b" }}
//               />
//             </Flex>
//           </Box>
//         )}
//       </Flex>
//     </LayoutDefault>
//   );
// }
"use client";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Medias } from "../components/admin/Medias";
import LayoutEditer from "../components/admin/LayoutEditer";
import { LayoutDefault } from "../components/admin/LayoutDefault";

export default function MediasPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCopy = async () => {
    if (selectedImage) {
      await navigator.clipboard.writeText(selectedImage);
      alert("Đã copy");
    }
  };

  return (
    <LayoutDefault>
      <div className="flex w-full">
        <div className="flex-1">
          <LayoutEditer w="1000px">
            <div className="px-5">
              <Medias onImageSelect={setSelectedImage} />
            </div>
          </LayoutEditer>
        </div>
        {selectedImage && (
          <div className="flex-1 mt-4 ml-4 bg-white px-2">
            <img
              src={selectedImage}
              alt="Selected"
              className="mt-2 w-[300px] h-[400px] object-contain cursor-pointer rounded-lg"
              onClick={handleCopy}
            />
            <div className="flex items-center mt-2">
              <a
                href={selectedImage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-blue-500 underline"
              >
                {selectedImage}
              </a>
              <MdContentCopy
                className="w-6 h-6 cursor-pointer ml-4 text-teal-600 hover:text-teal-700"
                onClick={handleCopy}
              />
            </div>
          </div>
        )}
      </div>
    </LayoutDefault>
  );
}
