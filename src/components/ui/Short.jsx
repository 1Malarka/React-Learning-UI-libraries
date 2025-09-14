import { DropdownMenuCheckboxItem, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useTaskStore } from "../../Store";

export function DropdownMenuContentItems({ parentId, childId }) {
  const [isChangeOpen, setIsChangeOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [newText, setNewText] = useState("");
  const removeChild = useTaskStore((state) => state.removeChild)
  const editChild = useTaskStore((state) => state.editChild)

  return (
    <>
      <DropdownMenuContent> 
        <DropdownMenuCheckboxItem onClick={() => setIsChangeOpen(true)}>
          ✏ Change
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={() => setIsDeleteOpen(true)}>
          ❌ Delete
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
 
    <Dialog open={isChangeOpen} onOpenChange={setIsChangeOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subtask</DialogTitle>
            <DialogDescription>
              Make changes to your sub-task here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input id="name-1" name="name" placeholder="Type new text here." 
              onChange={(e) => setNewText(e.currentTarget.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsChangeOpen(false)}>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => {editChild(parentId, childId, newText); 
            setIsChangeOpen(false)}}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this sub-task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {removeChild(parentId, childId); setIsDeleteOpen(false)}}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function ChooseTextParent(){
  const [title, setNewTitle] = useState("");
  const addParent = useTaskStore((state) => state.addParent)
   
  return (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Name Task</DialogTitle>
            <DialogDescription>
              Name your Task here. Click save when you&apos;re
              done.
              Warning!!! You CAN&apos;T change name of your task.
              Only possible way to change it - Delete task
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input id="name-1" name="name" placeholder="Type task name here." 
              onChange={(e) => setNewTitle(e.currentTarget.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
            <Button type="submit" onClick={() => addParent(title)}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
  )
}

export function ChooseTextChild( { parentId } ){
  const [text, setNewText] = useState("");
  const addChild = useTaskStore((state) => state.addChild)
   
  return (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Name Sub-Task</DialogTitle>
            <DialogDescription>
              Name your sub-task here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input id="name-1" name="name" placeholder="Type task name here." 
              onChange={(e) => setNewText(e.currentTarget.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
            <Button type="submit" onClick={() => addChild(parentId, text)}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>     
  )
}

export function ChooseRemoveParent( { parentId } ){
  const removeParent = useTaskStore((state) => state.removeParent)
   
  return (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Section</DialogTitle>
            <DialogDescription>
             <strong> Warning!!!</strong> This action CAN&apos;T be undone.
              This will permanently delete section from everywhere.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
            <Button type="submit" onClick={() => removeParent(parentId)}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
  )
}