import { BsSearch } from 'react-icons/bs';
import Input, { useInput } from '../../components/input';
import Button from '../../components/button';
import { FiUserPlus } from 'react-icons/fi';
import * as Dialog from '@radix-ui/react-dialog';
import openFilePicker from '../../utils/filePicker';
import { FormEvent, useEffect, useState } from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { IoIosClose } from 'react-icons/io';
import { CiImageOn } from 'react-icons/ci';

export default function ArtistAdmin() {
  return (
    <main>
      <div className='flex gap-3 items-center'>
        <Input icon={<BsSearch />} type='search' placeholder='search artist' />
        <Dialog.Root>
          <Dialog.Trigger>
            <Button label='new artist' icon={<FiUserPlus />} variant='hollow' />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className='bg-black opacity-25 z-[45] data-[state=open]:animate-overlayShow fixed inset-0' />

            <Dialog.Content className='z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
              <NewArtistForm />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </main>
  );
}

function NewArtistForm() {
  const artistName = useInput();

  const [coverImage, setCoverImage] = useState<File | undefined>(undefined);
  const [coverImageSrc, setCoverImageSrc] = useState<
    string | ArrayBuffer | null | undefined
  >(undefined);

  const reader = new FileReader();
  reader.onload = (e) => setCoverImageSrc(e.target?.result);

  useEffect(() => {
    if (coverImage) {
      reader.readAsDataURL(coverImage);
    } else {
      setCoverImageSrc(undefined);
    }
  }, [coverImage]);

  const createNewArtist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // uploading cover to s3

    // uploading data to db
  };

  const selectArtistCover = async () => {
    const coverImage = await openFilePicker({ accept: ['jpg', 'png'] });
    setCoverImage(coverImage[0]);
  };

  const removeCoverImage = () => setCoverImage(undefined);

  return (
    <form onSubmit={createNewArtist}>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <Input label='artist name' {...artistName.inputProps} required />
          <Input label='external url' />
        </div>
        {coverImageSrc ? (
          <div className='relative w-[125px]'>
            <Button
              onClick={removeCoverImage}
              icon={<IoIosClose />}
              className='absolute w-5 h-5 text-2xl top-1 left-1 z-50 p-0'
            />
            <AspectRatio
              ratio={1}
              className='w-[125px] h-[125px] rounded-lg overflow-hidden'
            >
              <img
                src={coverImageSrc?.toString()}
                className='h-full w-full object-cover brightness-75'
                alt='artist cover'
              />
            </AspectRatio>
          </div>
        ) : (
          <Button
            label='select'
            icon={<CiImageOn />}
            className='w-[125px] h-[125px]'
            variant='hollow'
            onClick={selectArtistCover}
          />
        )}
      </div>
      <Button
        label='create artist'
        className='mt-4 w-full max-w-none'
        disabled={!artistName.valid}
      />
    </form>
  );
}
