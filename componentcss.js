export function getMyComponentCSS() {
    return `
                .project-card {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    max-width: 300px;
                    text-align: left;
                }

                .project-card img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                hgroup .year {
                    font-size: 0.9rem;
                    color: #888;
                    margin: 10px;
                }

                hgroup .project {
                    font-size: 1.2rem;
                    margin: 10px;
                }

                hgroup {
                    background-color: white;
                }

                .project-card {
                    text-align: center;
                    background-color: white;
                }
                `;
}