import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { createAxiosInstance } from '@/config/axios-config'
import { toast } from 'sonner'
import { ENDPOINT } from '@/constants/endpoints-const'
import Loader from './Loader'

export default function CategoryModal({ open,setOpen }) {
  const [category, setCategory] = useState('')
  const [isLoading,setIsLoading]  = useState(false);
  const baseAxios = createAxiosInstance();

  const handleCreateCategory = async() =>{
    if (!category.trim()){
        toast.error("Enter a category");
        return
    }
    try{
        setIsLoading(true)
        const response = await baseAxios.post(ENDPOINT.ADMIN_CATEGORY_CREATE, {name: category})
        setCategory("");
        setOpen(false)
        setIsLoading(false)
        toast.success("Category Create Successfully");
    }
    catch(error){
        toast.error(error.message);
        setCategory("");
        setOpen(false)
        setIsLoading(false)
    }
    
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[1000000000]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-[100000] w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-sm font-semibold leading-6 text-gray-900">
                    Create Category
                  </DialogTitle>
                  <div className="mt-2 w-full">
                    <input type="text" className=" placeholder:text-slate-400 block bg-white w-[100%] border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleCreateCategory()}
                className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/20 hover:text-black sm:ml-3 sm:w-auto"
              >
                {isLoading?<Loader/>:"Create"}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
