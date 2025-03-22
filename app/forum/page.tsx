'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialPosts = [
  { id: 1, author: 'John', content: 'How do I open a bank account in Canada?' },
  { id: 2, author: 'Sarah', content: 'What are the best credit cards for students?' },
]

export default function ForumPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState({ author: '', content: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPosts([...posts, { id: posts.length + 1, ...newPost }])
    setNewPost({ author: '', content: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Newcomers Forum</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              placeholder="Your Name" 
              value={newPost.author} 
              onChange={(e) => setNewPost({...newPost, author: e.target.value})}
            />
            <Textarea 
              placeholder="Your Question or Experience" 
              value={newPost.content} 
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            />
            <Button type="submit">Post</Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.author}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

