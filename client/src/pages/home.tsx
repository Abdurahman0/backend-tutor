import PostCard from '@/components/cards/post.card'
import ConfirmModal from '@/components/modals/confirm.modal'
import PostLoading from '@/components/shared/post-loading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import $axios from '@/http'
import { IPost } from '@/interfaces'
import { postStore } from '@/store/post.store'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'

function Home() {
	const { setPosts, posts } = postStore()

	const { isLoading, error } = useQuery({
		queryKey: ['get-posts'],
		queryFn: async () => {
			const { data, status } = await $axios.get('/post/get-all')
			if (status === 200) {
				setPosts(data)
			}
			return data
		},
	})

	return (
		<>
			<div className='container max-w-4xl mx-auto mt-28'>
				<div className='grid grid-cols-3 gap-4'>
					{error && (
						<Alert variant={'destructive'}>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{error.message}</AlertDescription>
						</Alert>
					)}
					{isLoading &&
						Array.from({ length: 6 }).map((_, idx) => (
							<PostLoading key={idx} />
						))}
					{posts?.map((post: IPost) => (
						<PostCard key={post._id} post={post} />
					))}
				</div>
			</div>

			<ConfirmModal />
		</>
	)
}

export default Home
