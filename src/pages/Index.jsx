import React, { useState } from "react";
import { Box, Button, VStack, Image, Input, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { FaUpload, FaQrcode } from "react-icons/fa";

const Index = () => {
  const [images, setImages] = useState([]);
  const toast = useToast();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      // Create object URLs for the uploaded files
      const newImages = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImages(newImages);

      // Show a toast notification
      toast({
        title: "Images uploaded.",
        description: `You have uploaded ${event.target.files.length} images.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8} p={8}>
      <Box>
        <Input type="file" accept="image/*" multiple onChange={handleImageChange} display="none" id="file-upload" />
        <Button leftIcon={<FaUpload />} as="label" htmlFor="file-upload">
          Upload Images
        </Button>
      </Box>

      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
        {images.map((src, index) => (
          <Box key={index} boxSize="150px" overflow="hidden">
            <Image src={src} alt={`Uploaded image ${index}`} fit="cover" />
          </Box>
        ))}
      </SimpleGrid>

      {images.length > 0 && (
        <Box textAlign="center">
          <Button leftIcon={<FaQrcode />} colorScheme="teal">
            Generate QR Code
          </Button>
          <Text mt={2}>Click to generate a QR code for your images</Text>
          {/* Placeholder for QR code */}
          <Image src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjBwbGFjZWhvbGRlcnxlbnwwfHx8fDE3MTAwMzQ5NTh8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="QR Code Placeholder" boxSize="150px" mt={4} />
        </Box>
      )}
    </VStack>
  );
};

export default Index;
