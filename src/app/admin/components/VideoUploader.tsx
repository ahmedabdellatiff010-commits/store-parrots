"use client";

import { ChangeEvent, useMemo } from "react";

type VideoMode = "upload" | "url";

type Props = {
  mode: VideoMode;
  onModeChange: (mode: VideoMode) => void;
  value?: string | null;
  videoUrlValue: string;
  onVideoUrlChange: (value: string) => void;
  videoFile: File | null;
  onVideoFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  videoPreviewUrl?: string | null;
  videoUploadLoading: boolean;
  videoUploadError?: string | null;
  onRemove: () => void;
  disabled?: boolean;
};

function getVideoPreviewType(url: string) {
  if (!url) return "none";

  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/vimeo\.com/.test(url)) return "vimeo";
  return "direct";
}

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

function getVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : "";
}

export default function VideoUploader({
  mode,
  onModeChange,
  value,
  videoUrlValue,
  onVideoUrlChange,
  videoFile,
  onVideoFileChange,
  videoPreviewUrl,
  videoUploadLoading,
  videoUploadError,
  onRemove,
  disabled = false,
}: Props) {
  const previewType = useMemo(() => getVideoPreviewType(videoUrlValue || value || ""), [value, videoUrlValue]);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onModeChange("upload")}
          disabled={disabled}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "upload"
              ? "bg-zinc-950 text-white"
              : "bg-white text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          رفع فيديو
        </button>

        <button
          type="button"
          onClick={() => onModeChange("url")}
          disabled={disabled}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "url"
              ? "bg-zinc-950 text-white"
              : "bg-white text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          إضافة رابط
        </button>
      </div>

      {mode === "upload" ? (
        <div className="mt-4 space-y-4">
          <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-6 text-center transition hover:border-zinc-500">
            <span className="text-2xl">🎬</span>
            <span className="mt-2 text-sm font-semibold text-zinc-800">
              {videoFile ? videoFile.name : "اختر فيديو من الجهاز"}
            </span>
            <span className="mt-1 text-xs text-zinc-500">
              MP4, WebM, MOV • حتى 100MB
            </span>
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={onVideoFileChange}
              disabled={disabled}
            />
          </label>

          {videoFile && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600">
              <div className="flex items-center justify-between gap-3">
                <span>{videoFile.name}</span>
                <span className="text-xs text-zinc-400">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</span>
              </div>
            </div>
          )}

          {videoPreviewUrl ? (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
              <video src={videoPreviewUrl} controls className="w-full max-h-[320px] object-contain" />
            </div>
          ) : value ? (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
              <video src={value} controls className="w-full max-h-[320px] object-contain" />
            </div>
          ) : null}

          {(videoFile || value) && (
            <div className="flex flex-wrap gap-3">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700">
                تغيير الفيديو
                <input type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={onVideoFileChange} disabled={disabled} />
              </label>
              <button type="button" onClick={onRemove} disabled={disabled} className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                حذف الفيديو
              </button>
            </div>
          )}

          {videoUploadLoading && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700">
              جاري رفع الفيديو...
            </div>
          )}

          {videoUploadError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {videoUploadError}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <input
            value={videoUrlValue}
            onChange={(event) => onVideoUrlChange(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={disabled}
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-zinc-900"
          />

          <p className="text-xs text-zinc-500">
            يدعم YouTube, Vimeo, وروابط فيديو مباشرة MP4/WebM.
          </p>

          {(videoUrlValue || value) && (
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onRemove} disabled={disabled} className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                إزالة الرابط
              </button>
            </div>
          )}

          {previewType === "youtube" && videoUrlValue && (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
              <iframe src={getYouTubeEmbedUrl(videoUrlValue)} className="h-[240px] w-full" allowFullScreen />
            </div>
          )}

          {previewType === "vimeo" && videoUrlValue && (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
              <iframe src={getVimeoEmbedUrl(videoUrlValue)} className="h-[240px] w-full" allowFullScreen />
            </div>
          )}

          {previewType === "direct" && (videoUrlValue || value) && (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
              <video
                src={typeof videoUrlValue === "string" ? videoUrlValue : value || undefined}
                controls
                className="w-full max-h-[320px] object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
