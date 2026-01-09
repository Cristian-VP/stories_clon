import './App.css'
import { useStories } from "./context/StoriesContext.tsx";
import { StoryViewer } from './components/StoryViewer';
import { StoryCircle } from './components/StoryCircle';
import { UploadButton } from './components/UploadButton';
import { Plus } from 'lucide-react';

function App() {
    const { stories, createNewStory, addContentToStory, openViewer } = useStories();

    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-md mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
                </div>
            </header>

            {/* Stories Bar */}
            <div className="w-full bg-white border-b border-gray-200">
                <div className="max-w-md mx-auto px-4 py-4">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {/* Upload Button - Siempre crear nueva story */}
                        <UploadButton onUpload={createNewStory} />

                        {/* Story Circles */}
                        {stories.map((story, index) => (
                            <div key={story.id} className="relative">
                                <StoryCircle
                                    imageUrl={story.contents[0]?.imageUrl || ''}
                                    hasContent={story.contents.length > 0}
                                    contentCount={story.contents.length}
                                    onClick={() => openViewer(index)}
                                />
                                {/* Botón para agregar más contenido a este story */}
                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.accept = 'image/*';
                                        input.onchange = async (event) => {
                                            const file = (event.target as HTMLInputElement).files?.[0];
                                            if (file) {
                                                await addContentToStory(story.id, file);
                                            }
                                        };
                                        input.click();
                                    }}
                                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-700 transition-colors"
                                    title="Agregar más contenido"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {stories.length === 0 && (
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="text-center">
                        <div className="mb-4">
                            <svg
                                className="w-16 h-16 mx-auto text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No stories yet
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Upload your first story to get started
                        </p>
                        <div className="relative inline-block">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    if (e.target.files?.[0]) {
                                        await createNewStory(e.target.files[0]);
                                    }
                                }}
                                className="hidden"
                                id="empty-upload"
                            />
                            <label
                                htmlFor="empty-upload"
                                className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                Choose Image
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Instructions */}
            {stories.length > 0 && (
                <div className="max-w-md mx-auto px-4 py-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                        <p className="font-semibold text-gray-900 mb-2">💡 Instrucciones:</p>
                        <ul className="space-y-1">
                            <li>• Click en <strong>+</strong> arriba para crear una nueva story</li>
                            <li>• Click en el <strong>+ pequeño</strong> del círculo para agregar más imágenes a esa story</li>
                            <li>• Click en un círculo para ver la story completa</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Story Viewer Modal */}
            <StoryViewer />
        </div>
    );
}

export default App
