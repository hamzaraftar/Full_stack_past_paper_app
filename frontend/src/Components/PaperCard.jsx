function PaperCard({ paper }) {
  const year = new Date(paper.uploaded_at).getFullYear();

  // paper.file already starts with "/"
  const fileUrl = paper.file?.startsWith("http")
    ? paper.file
    : `${FILE_BASE_URL}${paper.file}`;

  return (
    <div className="flex flex-col rounded-2xl border border-[#17193B]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F1E4] text-[#B0895A]">
          <FileIcon className="h-5 w-5" />
        </span>

        <span className="rounded-full bg-[#F6F1E4] px-3 py-1 text-xs font-semibold text-[#17193B]/70">
          {year}
        </span>
      </div>

      {/* Title + meta */}
      <div className="mt-4 flex-1">
        <h3 className={`${display} text-lg font-bold text-[#17193B]`}>
          {paper.title}
        </h3>

        <p className="mt-1 text-sm text-[#17193B]/70">
          {paper.university} · {paper.subject}
        </p>

        <p className="mt-1 text-xs text-[#17193B]/50">
          Uploaded {formatDate(paper.uploaded_at)}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-[#17193B]/10 pt-3">
        <div className="mb-3">
          <span className="block truncate text-xs text-[#17193B]/50">
            Shared by {paper.uploaded_by}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {/* View */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-[#16202B] px-4 py-2 text-center text-xs font-semibold text-[#F6F1E4] transition-colors hover:bg-[#0F1720]"
          >
            View
          </a>

          {/* Download */}
          <button
            onClick={async () => {
              try {
                const response = await fetch(fileUrl);
                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");

                link.href = url;
                link.download = paper.file.split("/").pop();

                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.error("Download failed:", error);
              }
            }}
            className="cursor-pointer flex-1 rounded-full border border-[#16202B] px-4 py-2 text-center text-xs font-semibold text-[#16202B] transition-colors hover:bg-[#16202B] hover:text-[#F6F1E4]"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaperCard