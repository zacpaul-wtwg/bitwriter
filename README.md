# 🚀 Introducing BitWrite: Your Creative Flow Companion!

## 🌊 Stay in the creative flow: Write now, details later
In the world of writing, getting words on the page is paramount. BitWrite is your creative companion designed to keep you writing without letting unresolved details slows your progress. Say goodbye to everything that stalls your flow. With BitWrite, you can effortlessly craft your story, leaving the finer points for later.

## 📜 Plot Branches, No Hassle!
Bid farewell to the fear of losing your precious drafts. BitWrite's Plot Branches act as a steadfast guardian of your creative endeavors. It ensures you can explore different plot twists and character arcs without a second thought, preserving every iteration along the way. Keep your story flowing smoothly without missing a beat, and compare your branches side-by-side to see what works best.

## 📝 Flow-Maintaining //TODOs
BitWrite's //TODO feature acts as your administrative assistant, allowing you to mark scenes, dialogues, or descriptions you plan to write later. It's the gentle nudge you need to reduce friction between your ideas and the page. Keep your story's flow intact without breaking your creative rhythm.

## 🧩 Variable Names for Future Inspiration
Unlock your creativity with BitWrite's variable naming feature. Say goodbye to the struggle of finding the perfect character or place name in the heat of the moment. Instead, assign temporary names to `{placeholders}` and let your imagination soar. BitWrite keeps your focus on the story's flow, allowing you to make inspired choices when the time is right.

## 🌍 Organize Your Story World
Every world, whether real or imagined, thrives on order. With BitWrite, you can create Blueprints for characters, items, and places, just like arranging pieces into labeled bins. This organization keeps everything in its place and makes your story world feel more vivid and real. If you want to change a detail later, you can alter it in the blueprint anytime and the change will update throughout your story.

## 🎨 Highlight What Matters
Get a visual snapshot of your narrative with intuitive syntax highlighting. Instantly spot characters, places, and items on the page. It's your shortcut to keeping your story's essence at your fingertips as you craft it effortlessly.

## 📊 Visualize Your Narrative Structure 
BitWrite goes beyond traditional writing tools. Create a visual masterpiece of your story's structure with our modularization feature. Craft a coherent timeline, divide it into chapters, and break down each chapter into scenes. Our intuitive interface allows you to easily move chapters into the appropriate timeline, providing a seamless way to shape your narrative's structure.

Get ready to elevate your storytelling game! BitWrite is where the art of writing meets the joy of creation.

Don't wait; start your storytelling adventure with BitWrite today!

# Definitions

## Blueprint
A blueprint is a collection of characters, items, and places that you can use to create a story.
### Blue Print Types
1. Location
1. Character
1. Item
1. Generics
### Blueprint Structure
For all non generics, the blueprint structure is user defined. For generics, the blueprint structure is fixed, and that is:
```
{
  uniqueId: string, {
    typed: string,
    displayed: string,
  }
}
```
When a user types the `{typed}` into the story, the `displayed` value will be displayed. This is the simplest blueprint structure.

I am considering adding a more complex generic blueprint structure, but this is how it works for now. 

I haven't decided on how to handle the more complex blueprint structure yet. However, this is not a priority for now, as all we need to do is add them to the database. 

The table structure is as follows:
| id: auto incrementing | user_id: String | blueprint_type: enum(type values) | blueprint_data: jsonb |
|-----------------------|-----------------|-----------------------------------|-----------------------|

### Requirements
1. Auto incrementing starts at 10001
1. user_id needs to be tied to the user in supabase
1. blueprint data is stored as a json object

