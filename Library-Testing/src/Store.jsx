import { create } from "zustand"
import { nanoid } from "nanoid"

export const useTaskStore = create((set) => ({
  tasks: [
    {
      id: nanoid(), // Unique Id for Parent
      title: "Hello! I'm task №1",
      children: [
        { id: nanoid(), text: "Very long text, that have to be wrapped to the line below." }, // Each child also get it.
        { id: nanoid(), text: "Very short text." },
        { id: nanoid(), text: "Just an example." }
      ]
    },
    {
      id: nanoid(),
      title: "Hello! I'm task №2",
      children: [ 
        { id: nanoid(), text: "Hello! You can change me" }
      ]
    }
  ],

  // Add Parent
  addParent: (title) => {
  if (!title || title.trim().length === 0) return;
  set((state) => ({
    tasks: [...state.tasks, { id: nanoid(), title, children: [] }]
  }));
},

  // Add Child to some Parent
  addChild: (parentId, text) => { if (!text || text.trim().length === 0) return; set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === parentId
        ? { ...t, children: [...t.children, { id: nanoid(), text }] }
        : t
    )
  }));
},
  // Delete Child
  removeChild: (parentId, childId) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === parentId
        ? { ...t, children: t.children.filter((c) => c.id !== childId) }
        : t
    )
  })),

  // Delete Parent
  removeParent: (parentId) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== parentId)
  })),

  editChild: (parentId, childId, newText) => set((state) => ({
    tasks: state.tasks.map((t) => 
    t.id === parentId
    ? {...t, children: t.children.map((c) => c.id === childId ?
    { ...c, text: newText } : c
      ),
    }
    : t
   ),
  })),
}))

  