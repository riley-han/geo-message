"use client"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MessageSquareText } from "lucide-react"
import SelectContact from './select-contact'
import { useState } from "react"




interface NewMessageDrawerProps {
  open: boolean
  handleIsOpen: () => void
}



const NewMessageDrawer = ({open, handleIsOpen}: NewMessageDrawerProps) => {
  const [selectedContact, setSelectedContact] = useState<string | undefined>()

  return (
    <Drawer open={open} onOpenChange={handleIsOpen} direction='right'>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MessageSquareText/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>New Message</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <SelectContact
              value={selectedContact}
              onChange={setSelectedContact}
            />


          </div>
          <DrawerFooter>
            <Button disabled={!selectedContact}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}


export default NewMessageDrawer