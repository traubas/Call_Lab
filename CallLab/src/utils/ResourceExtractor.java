package utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;


import org.apache.commons.io.FileUtils;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.InputStreamSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

public class ResourceExtractor {

			public void extract(String resourceFolder, String destinationFolder){
			    try {
			        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
			        Resource[] resources = (Resource[]) resolver.getResources(ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX
			                + resourceFolder + "/**");
			        URI inJarUri  = new DefaultResourceLoader().getResource("classpath:" + resourceFolder).getURI();

			        for (Resource resource : resources){
			            String relativePath = resource
			                        .getURI()
			                        .getRawSchemeSpecificPart()
			                        .replace(inJarUri.getRawSchemeSpecificPart(), "");
			            if (relativePath.isEmpty()){
			                continue;
			            }
			            if (relativePath.endsWith("/") || relativePath.endsWith("\\")) {
			                File dirFile = new File(destinationFolder + relativePath);
			                if (!dirFile.exists()) {
			                    dirFile.mkdir();
			                }
			            }
			            else{
			                copyResourceToFilePath(resource, destinationFolder + relativePath);
			            }
			        }
			    }
			    catch (IOException e){
			        e.printStackTrace();
			    }
			}

			private void copyResourceToFilePath(Resource resource, String filePath) throws IOException{
			    InputStream resourceInputStream = ((InputStreamSource) resource).getInputStream();
			    File file = new File(filePath);
			    if (!file.exists()) {
			        FileUtils.copyInputStreamToFile(resourceInputStream, file);
			    }
			}
}
