# [SeekHealing Website](http://seekhealing.org)


This is the source code of the SeekHealing website built using [Jekyll](http://jekyllrb.com).

### Pre-requisites
- Ruby 2.2.5
- Bundler

### Running and building

```
bundle install       # Install Ruby gems/dependencies
jekyll build         # Generate site for deployment
jekyll serve         # Build and compile the site & assets
```

## Site Structure

| Directory | Description |
| ------------- |:------------- |
| _data | Directory contains yml files that contain related content that is not within individual pages or posts. |
| _includes | Contains several partials that are common to several generated pages. |
| _layouts | Contains the templates that are used to generate the commonality of the pages (default is the main one that all the pages use. |
| _pages | Contains all non-blog post pages. |
| _sass | Contains all the pre-process SASS files for the project. |
| _sections | These are custom Jekyll collections that contain logically grouped and associated content |
| admin | Contains the configuration needed for NetlifyCMS |
| assets/fonts | Contains the customized font libraries for the project. |
| assets/js | Contains the js libraries for the project. |
| assets/images | Contains all the image files for the site |
| css | Contains the base css file holder for the project. |
| downlaods | Contains all the downloadable files for the site (ex. - PDFs, DOCs, etc) |


## Editing Content in Netlify CMS

To be written