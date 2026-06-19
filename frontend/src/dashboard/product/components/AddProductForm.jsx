import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, NumberInput, Select, Textarea, Button, Image, Stack, Paper, Title, SimpleGrid, Group, Text, ActionIcon } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'; 
import { IconPhoto , IconX} from '@tabler/icons-react';
import { productSchema, CATEGORY_OPTIONS } from "../../../../utils/schemas/productSchema"; 
import { useState } from "react";

const AddProductForm = ({ onClose, editData }) => {
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: editData?.name || "",
      description: editData?.description || "",
      price: editData?.price || "",
      category: editData?.category || "",
    }
  });

  const handleFormSubmit = async (data) => {
    try {
        const finalData = {
            ...data,
            image_url: file, 
          };
            
        if (editData) {
        console.log('Updating product with ID:', editData.id);
        console.log('Update Data:', finalData);
      } else {
        console.log('Adding new product Data:', finalData);
      }
      reset();
        onClose();
      } catch (error) {
           console.log('error is ', error);
      }
    };
  return (
    <Paper withBorder  px={20} py="8">
      <Title order={3} ta="center" >{ editData ? 'Update ' : 'Add '} New Product</Title>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack>
          <TextInput
            label="Product Name"
            {...register("name")}
            error={errors.name?.message} />

          <SimpleGrid cols={2} >
           <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Price ($)"
                  decimalScale={2}
                  {...field}
                  error={errors.price?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select label="Category" data={CATEGORY_OPTIONS} {...field} error={errors.category?.message} />
              )}
            />
          </SimpleGrid>

          {/* Drag and Drop File Upload */}
          <Text size="sm" fw={500}>Product Image</Text>
          <Dropzone
            className="my-dropzone"
            onDrop={(files) => {
              setFile(files[0]);
              setValue("image_url", files[0]);
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group 
                justify="flex-start" 
                align="center" 
                gap="md" 
                mih={70} 
                p="xs"
                style={{ position: 'relative', width: '100%' }}
              >
                {file ? (
                  <>
                    <Image src={URL.createObjectURL(file)} w={60} h={60} radius="sm" fit="cover" />
                    
                    <Text fw={500} size="sm" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name}
                    </Text>
                    
                    <ActionIcon 
                      color="red" 
                      variant="light"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setFile(null); 
                      }}
                    >
                      <IconX size={18} />
                    </ActionIcon>
                  </>
                ) : (
                  <Group justify="center" style={{ width: '100%' }}>
                    <IconPhoto size={30} />
                    <Text size="sm">Drag images or click to select</Text>
                  </Group>
                )}
              </Group>
          </Dropzone>

          <Textarea label="Description" {...register("description")} error={errors.description?.message} />

          <Button type="submit" fullWidth >Save Product</Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddProductForm;