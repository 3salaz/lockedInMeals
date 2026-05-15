export default function SiteFooter() {
    return (
        <footer
            style={{
                padding: "2rem 1.5rem",
                borderTop: "1px solid #eaeaea",
                marginTop: "4rem",
            }}
        >
            <div className="max-w-300 mx-auto my-0">
                <p className="m-0">© 2026 {import.meta.env.VITE_CLIENT_NAME}. All rights reserved.</p>
            </div>
        </footer>
    );
}