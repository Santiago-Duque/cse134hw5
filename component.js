import './script.js';
import {getMyComponentCSS} from './componentcss.js';

class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const style = document.createElement('style');
        style.textContent = getMyComponentCSS();

        const year = this.getAttribute('year') || 'Unknown Year';
        const project = this.getAttribute('project') || 'Unknown Project';
        const imageUrl = this.getAttribute('image-url') || '';
        const projectUrl = this.getAttribute('project-url') || '#';
        const description = this.getAttribute('description') || '';

        this.innerHTML = '';
        this.appendChild(style);
        this.innerHTML += `
            <a href = "${projectUrl}">
            <div class = "project-card">
                <hgroup>
                    <p class = "year">${year}</p>
                    <h2 class = "project">${project}</h2>
                </hgroup>
                <picture>
                    <source srcset="${imageUrl}" type="image/webp">
                    <img src = "${imageUrl}" alt = "${project}">
                </picture>
                <p class = "description">${description}</p>
            </div>
            </a>
        `;
        this.querySelector('.project-card').addEventListener('click', () => this.publishMessage());
    }

    publishMessage() {
        const event = new CustomEvent('click-project', {
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

console.log("Custom Element Defined");
customElements.define('project-card', ProjectCard);